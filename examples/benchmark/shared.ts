import { it, expect } from "bun:test";
import type { AnyObject } from "@michijs/michijs/index";
import { existsSync } from "fs";
import { spawn } from "bun";

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

interface Trace {
  traceEvents: TimingResult[];
}

interface TimingResult {
  type: string;
  ts: number;
  name?: string;
  args?: AnyObject;
  dur?: number;
  end?: number;
  mem?: number;
  pid: number;
  cat: string;
}

/**
 * Detects Chrome/Chromium installation path across different platforms
 */
export function getChromePath(): string | undefined {
  // Check environment variable first
  if (Bun.env.BUN_CHROME_PATH) {
    return Bun.env.BUN_CHROME_PATH;
  }

  // CI environment
  if (Bun.env.CI) {
    const ciPaths = [
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/usr/bin/google-chrome",
      "/usr/bin/chrome",
    ];
    for (const path of ciPaths) {
      if (existsSync(path)) return path;
    }
  }

  const platform = process.platform;

  // Windows paths
  if (platform === "win32") {
    const windowsPaths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
      `${process.env["PROGRAMFILES(X86)"]}\\Google\\Chrome\\Application\\chrome.exe`,
      "C:\\Program Files\\Chromium\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Chromium\\Application\\chrome.exe",
    ];
    for (const path of windowsPaths) {
      if (path && existsSync(path)) return path;
    }
  }

  // macOS paths
  if (platform === "darwin") {
    const macosPaths = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      `${process.env.HOME}/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`,
      `${process.env.HOME}/Applications/Chromium.app/Contents/MacOS/Chromium`,
    ];
    for (const path of macosPaths) {
      if (path && existsSync(path)) return path;
    }
  }

  // Linux paths
  if (platform === "linux") {
    const linuxPaths = [
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/snap/bin/chromium",
      "/usr/local/bin/chrome",
      "/usr/local/bin/chromium",
    ];
    for (const path of linuxPaths) {
      if (existsSync(path)) return path;
    }
  }

  // Return undefined to use system default
  return undefined;
}

/**
 * Launch Chrome with remote debugging enabled (for Windows WebSocket connection)
 */
export async function launchChromeWithDebugging(port = 9222): Promise<{ 
  process: any; 
  wsUrl: string | null;
}> {
  const chromePath = getChromePath();
  if (!chromePath) {
    throw new Error('Chrome not found. Please install Chrome or set BUN_CHROME_PATH');
  }

  const userDataDir = `${process.env.TEMP || '/tmp'}/chrome-debug-${Date.now()}`;
  
  const chromeProcess = spawn([
    chromePath,
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
  ], {
    stdout: 'pipe',
    stderr: 'pipe',
  });

  // Wait for Chrome to be ready and get WebSocket URL
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    const response = await fetch(`http://localhost:${port}/json/version`);
    const data = await response.json() as { webSocketDebuggerUrl?: string };
    return {
      process: chromeProcess,
      wsUrl: data.webSocketDebuggerUrl || null,
    };
  } catch (error) {
    return {
      process: chromeProcess,
      wsUrl: null,
    };
  }
}

/**
 * Creates WebView options with Chrome backend configuration
 * On Windows, uses WebSocket connection; on other platforms, uses spawn
 */
export async function createWebViewOptions(): Promise<any> {
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // On Windows, we need to use WebSocket connection
    // Try to get existing Chrome debugging session
    try {
      const response = await fetch('http://localhost:9222/json/version');
      const data = await response.json() as { webSocketDebuggerUrl?: string };
      
      if (data.webSocketDebuggerUrl) {
        return {
          backend: {
            type: 'chrome',
            url: data.webSocketDebuggerUrl
          }
        };
      }
    } catch {
      // Chrome not running with debugging, will need to launch it
    }
    
    throw new Error(
      'Chrome with remote debugging is not running. ' +
      'Please start Chrome with: chrome.exe --remote-debugging-port=9222 ' +
      'or use launchChromeWithDebugging() helper'
    );
  }
  
  // On Linux/macOS, use spawn path
  const chromePath = getChromePath();

  if (chromePath) {
    return {
      backend: {
        type: "chrome",
        path: chromePath,
      },
    };
  }

  // Fallback to default (will auto-detect)
  return { backend: "chrome" };
}

const getRowId = async (view: Bun.WebView, index: number) => {
  const textContent = await view.evaluate(`
    document.querySelectorAll('tr')[${index}]?.querySelector('td')?.textContent
  `);
  return Number(textContent);
};

export async function makePerformanceTests(viewGetter: () => Bun.WebView) {
  const view = viewGetter();

  const create1000Rows = async () => {
    await view.click("#run");
  };
  const add1000Rows = async () => {
    await view.click("#add");
  };
  const create10000Rows = async () => {
    await view.click("#runlots");
  };
  const updateEvery10Rows = async () => {
    await view.click("#update");
  };
  const swapRows = async () => {
    await view.click("#swaprows");
  };
  const select = async (index: number) => {
    await view.evaluate(
      `document.querySelectorAll('tr')[${index}]?.querySelector('a')?.click()`,
    );
  };
  const deleteRow = async (index: number) => {
    await view.evaluate(
      `document.querySelectorAll('tr')[${index}]?.querySelectorAll('a')[1]?.click()`,
    );
  };
  const getTableBody = async (): Promise<number> => {
    return await view.evaluate(`document.querySelectorAll('tr').length`);
  };
  const clear = async () => {
    await view.click("#clear");
  };

  const results: Partial<Record<Result, number>> = {};
  const saveResult = async (
    key: Result,
    functionToMeasure: () => Promise<void>,
  ) => {
    // Measure performance using Performance API
    await view.evaluate(`performance.mark('start-${key}')`);
    await functionToMeasure();
    const duration = await view.evaluate<number>(`
      performance.mark('end-${key}');
      const measure = performance.measure('${key}', 'start-${key}', 'end-${key}');
      measure.duration;
    `);
    results[key] = Number(duration.toFixed(2));
  };
  it("creates 1000 rows when clicking run", async () => {
    await saveResult("create1000Rows", create1000Rows);
    expect(await getTableBody()).toEqual(1000);
  });
  it("replaces 1000 rows when clicking run", async () => {
    await create1000Rows();
    await saveResult("replaceAllRows", create1000Rows);
    const tableBodyLength = await getTableBody();
    expect(tableBodyLength).toEqual(1000);

    // Check that all row IDs are greater than 1000
    const allGreaterThan1000 = await view.evaluate(`
      Array.from(document.querySelectorAll('tr')).every(row => {
        const id = Number(row.querySelector('td')?.textContent);
        return id > 1000;
      })
    `);
    expect(allGreaterThan1000).toBeTruthy();
  });
  it("update every 10th row 1000 rows on a table with 1000 rows when clicking update", async () => {
    await create1000Rows();
    await saveResult("partialUpdate", updateEvery10Rows);
    const tableBodyLength = await getTableBody();
    expect(tableBodyLength).toEqual(1000);

    // Check that every 10th row has !!!
    const updateResult = await view.evaluate(`
      Array.from(document.querySelectorAll('tr')).every((row, index) => {
        const innerHTML = row.innerHTML;
        if (index % 10 === 0) {
          return innerHTML.includes('!!!');
        } else {
          return !innerHTML.includes('!!!');
        }
      })
    `);
    expect(updateResult).toBeTruthy();
  });
  it("select a row (1000 rows)", async () => {
    await create1000Rows();
    await saveResult("selectRow", () => select(999));
    const className = await view.evaluate(
      `document.querySelectorAll('tr')[999]?.className`,
    );
    expect(className).toEqual("danger");

    await select(998);
    const classNameSecondTime = await view.evaluate(
      `document.querySelectorAll('tr')[999]?.className`,
    );
    expect(classNameSecondTime).not.toBe("danger");
  });
  it("swap a row (1000 rows)", async () => {
    await create1000Rows();
    await saveResult("swapRows", swapRows);
    const firstRowId = await getRowId(view, 1);
    expect(firstRowId).toEqual(999);
    const secondRowId = await getRowId(view, 998);
    expect(secondRowId).toEqual(2);
  });
  it("remove a row (1000 rows)", async () => {
    await create1000Rows();
    const rowToDeleteId = await getRowId(view, 996);
    await saveResult("removeRow", async () => await deleteRow(996));
    const newTableLength = await getTableBody();

    // Verify the deleted row ID is not in the table
    const deletedRowNotFound = await view.evaluate(`
      !Array.from(document.querySelectorAll('tr')).some(row => {
        return Number(row.querySelector('td')?.textContent) === ${rowToDeleteId};
      })
    `);
    expect(deletedRowNotFound).toBeTruthy();
    expect(newTableLength).toEqual(999);
  });
  it("creates 10000 rows when clicking runlots", async () => {
    await saveResult("createManyRows", create10000Rows);
    expect(await getTableBody()).toEqual(10000);
  });
  it("append 1000 rows on a large table", async () => {
    await create10000Rows();
    await saveResult("appendRowsToLargeTable", add1000Rows);
    expect(await getTableBody()).toEqual(11000);
  });
  it("clear rows", async () => {
    await create1000Rows();
    await saveResult("clearRows", clear);
    expect(await getTableBody()).toEqual(0);
  });
  return results;
}
