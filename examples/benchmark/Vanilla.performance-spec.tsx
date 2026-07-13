import { makePerformanceTests, createWebViewOptions, launchChromeWithDebugging } from "./shared";
import { describe, beforeEach, afterAll, beforeAll } from "bun:test";
import { spawn } from "bun";
import { writeFileSync } from "fs";
import { updateDiff } from "./updateDiff";

const serverProcess = spawn([process.execPath, "run", "start"], {
  stdout: "inherit",
  stderr: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING_VANILLA" },
});

describe("Performance tests - vanilla-js", async () => {
  let chromeProcess: any;
  let view: Bun.WebView;

  beforeAll(async () => {
    // On Windows, launch Chrome with debugging
    if (process.platform === 'win32') {
      const result = await launchChromeWithDebugging(9223); // Different port
      chromeProcess = result.process;
      
      if (!result.wsUrl) {
        throw new Error('Failed to get WebSocket URL from Chrome');
      }
      
      view = new Bun.WebView({
        backend: {
          type: 'chrome',
          url: result.wsUrl
        }
      });
    } else {
      // On Linux/macOS, use spawn
      view = new Bun.WebView(await createWebViewOptions());
    }
  });

  beforeEach(async () => {
    await view.navigate("http://localhost:3001");
  });

  const resultsPromise = makePerformanceTests(() => view);
  
  afterAll(async () => {
    const results = await resultsPromise;
    const resultsString = JSON.stringify(results, undefined, 2);
    writeFileSync("./examples/benchmark/generated/vanillajs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
    
    // Cleanup
    if (chromeProcess) {
      chromeProcess.kill(2);
    }
  });
});

describe("Performance tests - vanilla-js", async () => {
  await using view = new Bun.WebView(createWebViewOptions());

  beforeEach(async () => {
    await view.navigate("http://localhost:3001");
  });

  const resultsPromise = makePerformanceTests(() => view);

  afterAll(async () => {
    const results = await resultsPromise;
    const resultsString = JSON.stringify(results, undefined, 2);
    writeFileSync(
      "./examples/benchmark/generated/vanillajs.json",
      resultsString,
    );
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
  });
});
