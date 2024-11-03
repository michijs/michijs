import { type Browser, chromium, type Page } from "playwright-core";
import { installPlaywright, makePerformanceTests } from "./shared";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { spawn } from "child_process";
import { omit } from "@michijs/michijs";
import { writeFileSync } from "fs";
import michijs from "./results/michijs.json";
import vanillajs from "./results/vanillajs.json";
import packagejson from "../../package.json";
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

  const resultsPromise = makePerformanceTests(() => page);
  afterAll(async () => {
    const results = await resultsPromise;
    writeFileSync(
      "./tests/benchmark/results/michijs.json",
      JSON.stringify(
        {
          [packagejson.version]: results,
          ...omit(michijs, [packagejson.version]),
        },
        undefined,
        2,
      ),
    );
    const diff = Object.entries(results).reduce(
      (previousValue, [key, value]) => {
        // Bigger values are worst
        previousValue[key] = Math.max(
          0,
          Number((value - vanillajs[key]).toFixed(2)),
        );
        return previousValue;
      },
      {},
    );
    const diffResults = JSON.stringify(diff, undefined, 2);
    console.log("Diff results: ", diffResults);
    writeFileSync("./tests/benchmark/results/diff.json", diffResults);
    serverProcess.kill(2);
    browser.close();
  });
});
