import { type Browser, chromium, type Page } from "playwright-core";
import { installPlaywright, makePerformanceTests } from "./shared";
import { describe, beforeEach, afterAll } from "bun:test";
import { spawn } from "child_process";
import { writeFileSync } from 'fs'
const serverProcess = spawn("bun", ["run", "start"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING_VANILLA" },
});

await installPlaywright();
describe("Performance tests - vanilla-js", () => {
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    browser = await chromium.launch({
      headless: true,
    });;
    page = await browser.newPage();
    await page.goto("http://localhost:3001", {
      waitUntil: "domcontentloaded",
    });
  });
  const results = makePerformanceTests(() => page);
  afterAll(async () => {
    writeFileSync('./tests/benchmark/results/vanillajs.json', JSON.stringify(await results, undefined, 2));
    serverProcess.kill(2);
    browser.close();
  });
});
