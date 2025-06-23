import { type Browser, chromium, type Page } from "playwright-core";
import { installPlaywright, makePerformanceTests } from "./shared";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { spawn } from "child_process";
import { omit } from "@michijs/michijs";
import { writeFileSync } from "fs";
import michijs from "./results/michijs.json";
import packagejson from "../../package.json";
import { updateDiff } from "./updateDiff";
const serverProcess = spawn("bun", ["run", "start"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING" },
});
await installPlaywright();
describe("Performance tests - MichiJS", () => {
  let browser: Browser;
  let page: Page;
  beforeEach(async () => {
    browser = await chromium.launch({
      headless: true,
    });
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
        [packagejson.version]: results,
        ...omit(michijs, [packagejson.version]),
      },
      undefined,
      2,
    );
    writeFileSync("./tests/benchmark/results/michijs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff(results);
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
