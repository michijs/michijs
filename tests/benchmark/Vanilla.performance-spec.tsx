import { type Browser, chromium, type Page } from "playwright-core";
import { installPlaywright, makePerformanceTests } from "./shared";
import { describe, beforeEach, afterAll } from "bun:test";
import { spawn } from 'bun';
import { writeFileSync } from "fs";
import { updateDiff } from "./updateDiff";

const serverProcess = spawn([process.execPath, "run", "start"], {
  stdout: "inherit",
  stderr: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING_VANILLA" },
});

await installPlaywright();
describe("Performance tests - vanilla-js", () => {
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3001", {
      waitUntil: "domcontentloaded",
    });
  });

  const resultsPromise = makePerformanceTests(
    () => browser,
    () => page,
  );
  afterAll(async () => {
    const results = await resultsPromise;
    const resultsString = JSON.stringify(results, undefined, 2);
    writeFileSync("./tests/benchmark/results/vanillajs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
    browser.close();
  });
});
