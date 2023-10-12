import { Browser, launch, Page } from "puppeteer";
import { makePerformanceTests, Result } from "./shared";

describe("Performance tests - MichiJS", () => {
  let browser: Browser;
  let page: Page;
  beforeAll(async () => {
    browser = await launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000", {
      waitUntil: "domcontentloaded",
    });
  });
  afterEach(async () => {
    await page.reload({
      waitUntil: "domcontentloaded",
    });
  });

  it("matches the snapshot on initial render", async () => {
    const body = await page.$("body");
    const innerHTMLProperty = await body!.getProperty("innerHTML");
    const innerHTML = await innerHTMLProperty.jsonValue();
    expect(innerHTML).toMatchSnapshot();
  });

  const results = makePerformanceTests(() => page);
  afterAll(async () => {
    expect(
      new Map<string, Map<Result, number>>([
        [new Date().getTime().toString(), await results],
        [
          "1.1.7",
          new Map([
            ["create1000Rows", 195.06],
            ["replaceAllRows", 123.76],
            ["partialUpdate", 76.27],
            ["selectRow", 1438.36],
            ["swapRows", 36.6],
            ["removeRow", 1373.27],
            ["createManyRows", 1150.83],
            ["appendRowsToLargeTable", 246.86],
            ["clearRows", 42.68],
          ]),
        ],
        [
          "1.0.0",
          new Map([
            ["create1000Rows", 207.09],
            ["replaceAllRows", 185.54],
            ["partialUpdate", 44.55],
            ["selectRow", 40.72],
            ["swapRows", 23.92],
            ["removeRow", 49.16],
            ["createManyRows", 1639.74],
            ["appendRowsToLargeTable", 267.65],
            ["clearRows", 42.65],
          ]),
        ],
        [
          "legacy - 2.0.0",
          new Map([
            ["create1000Rows", 251.1],
            ["replaceAllRows", 249.82],
            ["partialUpdate", 84.96],
            ["selectRow", 67.85],
            ["swapRows", 78.81],
            ["removeRow", 80.18],
            ["createManyRows", 1782.93],
            ["appendRowsToLargeTable", 412.64],
            ["clearRows", 114.61],
          ]),
        ],
        [
          "legacy - 1.2.6",
          new Map([
            ["create1000Rows", 628.04],
            ["replaceAllRows", 1338.53],
            ["partialUpdate", 89.95],
            ["selectRow", 61.77],
            ["swapRows", 64.19],
            ["removeRow", 56.07],
            ["createManyRows", 7013.5],
            ["appendRowsToLargeTable", 1579.74],
            ["clearRows", 67.7],
          ]),
        ],
      ]),
    ).toMatchSnapshot("MichiJS Benchmarks");
    await browser.close();
  });
});
