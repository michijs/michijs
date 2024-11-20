import type { ElementHandle, Page, Browser } from "playwright-core";
import { it, expect } from "bun:test";
import { exec } from "child_process";
import packagejson from "../../package.json";

export type Result =
  | "create1000Rows"
  | "replaceAllRows"
  | "partialUpdate"
  | "selectRow"
  | "swapRows"
  | "removeRow"
  | "createManyRows"
  | "appendRowsToLargeTable"
  | "clearRows";

const getRowId = async (element: ElementHandle<Element>) => {
  const td = await element.$("td");
  if (!td) throw "td not found";
  const textContentProperty = await td.getProperty("textContent");
  const textContent = await textContentProperty.jsonValue();
  return Number(textContent);
};

export async function makePerformanceTests(
  browser: () => Browser,
  page: () => Page,
) {
  const create1000Rows = async () => {
    await page().click("#run");
  };
  const add1000Rows = async () => {
    await page().click("#add");
  };
  const create10000Rows = async () => {
    await page().click("#runlots");
  };
  const updateEvery10Rows = async () => {
    await page().click("#update");
  };
  const swapRows = async () => {
    await page().click("#swaprows");
  };
  const select = async (index: number) => {
    const tableBody = await getTableBody();
    const linkToClick = await tableBody[index].$("a");
    if (!linkToClick) throw "linkToClick not found";
    await linkToClick.click();
  };
  const deleteRow = async (index: number) => {
    const tableBody = await getTableBody();
    const linkToClick = await tableBody[index].$$("a");
    await linkToClick[1].evaluate((e) => e.click());
  };
  const getTableBody = async () => {
    return await page().$$("tr");
  };
  const clear = async () => {
    await page().click("#clear");
  };

  const results: Partial<Record<Result, number>> = {};
  const saveResult = async (
    key: Result,
    functionToMeasure: () => Promise<void>,
  ) => {
    await browser().startTracing(page());
    await functionToMeasure();
    const traceBuffer = await browser().stopTracing();
    const trace = JSON.parse(traceBuffer.toString());
    // console.log(traceBuffer.toString())
    const duration =
      trace.traceEvents.find(
        (x) => x?.name === "EventDispatch" && x?.args?.data?.type === "click",
      ).dur / 1000;
    results[key] = Number(duration.toFixed(2));
  };
  it("creates 1000 rows when clicking run", async () => {
    await saveResult("create1000Rows", create1000Rows);
    expect((await getTableBody()).length).toEqual(1000);
  });
  it("replaces 1000 rows when clicking run", async () => {
    await create1000Rows();
    await saveResult("replaceAllRows", create1000Rows);
    const tableBody = await getTableBody();
    expect(tableBody.length).toEqual(1000);
    await Promise.all(
      tableBody.map(async (row) => {
        const rowId = await getRowId(row);
        expect(rowId).toBeGreaterThan(1000);
      }),
    );
  });
  it("update every 10th row 1000 rows on a table with 1000 rows when clicking update", async () => {
    await create1000Rows();
    await saveResult("partialUpdate", updateEvery10Rows);
    const tableBody = await getTableBody();
    expect(tableBody.length).toEqual(1000);
    // Run all checks in parallel
    await Promise.all(
      tableBody.map(async (row, index) => {
        const innerHTMLProperty = await row.getProperty("innerHTML");
        const innerHTML = await innerHTMLProperty.jsonValue();

        if (index % 10 === 0) {
          expect(innerHTML.includes("!!!")).toBeTruthy();
        } else {
          expect(innerHTML.includes("!!!")).toBeFalsy();
        }
      }),
    );
  });
  it("select a row (1000 rows)", async () => {
    await create1000Rows();
    await saveResult("selectRow", () => select(999));
    const tableBody = await getTableBody();
    const classNameProperty = await tableBody[999].getProperty("className");
    const className = await classNameProperty.jsonValue();
    expect(className).toEqual("danger");
  });
  it("swap a row (1000 rows)", async () => {
    await create1000Rows();
    await saveResult("swapRows", swapRows);
    const tableBody = await getTableBody();
    const firstRowId = await getRowId(tableBody[1]);
    expect(firstRowId).toEqual(999);
    const secondRowId = await getRowId(tableBody[998]);
    expect(secondRowId).toEqual(2);
  });
  it("remove a row (1000 rows)", async () => {
    await create1000Rows();
    const tableBody = await getTableBody();
    const rowToDeleteId = await getRowId(tableBody[996]);
    await saveResult("removeRow", async () => await deleteRow(996));
    const newTable = await getTableBody();

    await Promise.all(
      newTable.map(async (row) => {
        const rowId = await getRowId(row);
        expect(rowId !== rowToDeleteId).toBeTruthy();
      }),
    );
    expect(newTable.length).toEqual(999);
  });
  it("creates 10000 rows when clicking runlots", async () => {
    await saveResult("createManyRows", create10000Rows);
    expect((await getTableBody()).length).toEqual(10000);
  });
  it("append 1000 rows on a large table", async () => {
    await create10000Rows();
    await saveResult("appendRowsToLargeTable", add1000Rows);
    expect((await getTableBody()).length).toEqual(11000);
  });
  it("clear rows", async () => {
    await create1000Rows();
    await saveResult("clearRows", clear);
    expect((await getTableBody()).length).toEqual(0);
  });
  return results;
}

export async function installPlaywright() {
  console.log("Installing Playwright...");

  return new Promise<void>((resolve, reject) => {
    const runners = ["bunx", "npx"];
    exec(
      runners
        .map(
          (x) =>
            `${x} playwright@${packagejson.devDependencies["playwright-core"]} install chromium --with-deps`,
        )
        .join(" || "),
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `Error during Playwright installation: ${error.message}`,
          );
          return reject(error);
        }
        console.log(stdout);
        resolve();
      },
    );
  });
}
