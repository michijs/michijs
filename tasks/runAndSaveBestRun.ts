import { spawn } from "child_process";
import packagejson from "../package.json";
import { readFileSync, writeFileSync } from "fs";
import { omit } from "../src/michijs/utils/omit";
import { updateDiff } from "../tests/benchmark/updateDiff";

const times = 100;

const run = () =>
  new Promise<void>((resolve) => {
    const process = spawn("bun", ["run", "benchmark-michijs"], { stdio: "inherit" });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`Process exited with code ${code}`)
        resolve();
      }
    });
  });

const michijsJsonPath = "./tests/benchmark/results/michijs.json";
const jsonContent = JSON.parse(readFileSync(michijsJsonPath, "utf-8"));
let bestResults = jsonContent[packagejson.version];

for (let i = 0; i < times; i++) {
  await run();
  const newResults = JSON.parse(readFileSync(michijsJsonPath, "utf-8"))[packagejson.version] || {};

  bestResults = Object.entries(newResults).reduce(
    (previousValue, [key, newResultsValue]) => {
      previousValue[key] = Math.min(newResultsValue as number, bestResults[key] ?? Infinity);
      return previousValue;
    },
    {},
  );

  const resultsString = JSON.stringify(
    {
      [packagejson.version]: bestResults,
      ...omit(jsonContent, [packagejson.version]),
    },
    undefined,
    2,
  );
  writeFileSync(michijsJsonPath, resultsString);
}
updateDiff(bestResults)
