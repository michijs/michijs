import { makePerformanceTests } from "./shared";
import { describe, it, expect, beforeEach, afterAll } from "bun:test";
import { writeFileSync } from "fs";
import michijs from "./generated/michijs.json";
import { currentVersion } from "../../tasks/currentVersion";
import { updateDiff } from "./updateDiff";
import { spawn } from "bun";
import { omit } from "../../src/shared/utils";

const serverProcess = spawn([process.execPath, "run", "start"], {
  stdout: "inherit",
  stderr: "inherit",
  env: { ...process.env, NODE_ENV: "TESTING" },
});

describe("Performance tests - MichiJS", async () => {
  await using view = new Bun.WebView();
  
  beforeEach(async () => {
    await view.navigate("http://localhost:3000");
  });

  it("matches the snapshot on initial render", async () => {
    const innerHTML = await view.evaluate(`document.querySelector('body')?.innerHTML`);
    expect(innerHTML).toMatchSnapshot();
  });

  const resultsPromise = makePerformanceTests(() => view);
  
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
    writeFileSync("./examples/benchmark/generated/michijs.json", resultsString);
    console.log("Results: ", JSON.stringify(results, undefined, 2));
    updateDiff();
    serverProcess.kill(2);
  });
});

// Personal notes about performance:
// appendItem forEach (with referenced function) > appendItem for in > append forEach > fragment for in
// for in > forEach Object.keys when has no inherited enumerable properties
// for of > forEach
// Do not create unnecesary callbacks - move them to a separated function
// childList[i] > chilList.item(i)
