import { type Browser, launch, type Page } from "puppeteer";
import { makePerformanceTests } from "./shared";
import { describe, expect, beforeEach, afterAll } from "bun:test";
import { spawn } from "child_process";
const serverProcess = spawn("bun", ["run", "start"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING_VANILLA" },
});

describe("Performance tests - vanilla-js", () => {
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    browser = await launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3001", {
      waitUntil: "domcontentloaded",
    });
  });
  const results = makePerformanceTests(() => page);
  afterAll(async () => {
    expect(await results).toMatchSnapshot("Vanilla JS");
    serverProcess.kill();
    browser.close();
  });
});
