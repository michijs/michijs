import { makePerformanceTests, createWebViewOptions } from "./shared";
import { describe, beforeEach, afterAll } from "bun:test";
import { spawn } from "bun";
import { writeFileSync } from "fs";
import { updateDiff } from "./updateDiff";

const serverProcess = spawn([process.execPath, "run", "start"], {
  stdout: "inherit",
  stderr: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING_VANILLA" },
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
    writeFileSync("./examples/benchmark/generated/vanillajs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
  });
});
