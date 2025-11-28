import { type Browser, chromium, type Page } from "playwright-core";
import { installPlaywright, makePerformanceTests } from "./shared";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { writeFileSync } from "fs";
import michijs from "./results/michijs.json";
import { currentVersion } from "../../tasks/currentVersion";
import { updateDiff } from "./updateDiff";
import { spawn } from 'bun';
import { omit } from '../../src/michijs/utils'

const serverProcess = spawn([process.execPath, "run", "start"], {
  stdout: "inherit",
  stderr: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING" },
});
let browser: Browser;
if (Bun.env.CI) {
  browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ['--no-sandbox', '--single-process', '--no-zygote', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
} else {
  await installPlaywright();
  browser = await chromium.launch();
}
describe("Performance tests - MichiJS", () => {
  let page: Page;
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000", {
      waitUntil: "domcontentloaded",
    });
  });

  it("matches the snapshot on initial render", async () => {
    const body = await page.$("body");
    const innerHTMLProperty = await body!.getProperty("innerHTML");
    const innerHTML = await innerHTMLProperty.jsonValue();
    expect(innerHTML).toMatchSnapshot();
  });

  const resultsPromise = makePerformanceTests(
    () => browser,
    () => page,
  );
  afterAll(async () => {
    const results = await resultsPromise;
    const resultsString = JSON.stringify(
      {
        [currentVersion]: results,
        ...omit(michijs, [currentVersion]),
      },
      undefined,
      2,
    );
    writeFileSync("./tests/benchmark/results/michijs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
    browser.close();
  });
});

// Personal notes about performance:
// appendItem forEach (with referenced function) > appendItem for in > append forEach > fragment for in
// for in > forEach Object.keys when has no inherited enumerable properties
// for of > forEach
// Do not create unnecesary callbacks - move them to a separated function
// childList[i] > chilList.item(i)
