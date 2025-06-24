import { spawn } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { omit } from "../src/michijs/utils/omit";
import { currentVersion } from "./currentVersion";

const times = 1000;
const fw: "michijs" | "vanillajs" = "michijs";

const run = () =>
  new Promise<void>((resolve) => {
    const process = spawn("bun", ["run", `benchmark-${fw}`], {
      stdio: "inherit",
    });

    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`Process exited with code ${code}`);
        resolve();
      }
    });
  });

const fwJsonPath = `./tests/benchmark/results/${fw}.json`;
const jsonContent = (await import(`.${fwJsonPath}`)).default;
let bestResults = jsonContent[currentVersion];

for (let i = 0; i < times; i++) {
  await run();
  const newResults =
    JSON.parse(readFileSync(fwJsonPath, "utf-8"))[currentVersion] || {};

  if (bestResults)
    bestResults = Object.entries(newResults).reduce(
      (previousValue, [key, newResultsValue]) => {
        previousValue[key] = Math.min(
          newResultsValue as number,
          bestResults[key] ?? Number.POSITIVE_INFINITY,
        );
        return previousValue;
      },
      {},
    );
  else bestResults = newResults;

  const resultsString = JSON.stringify(
    {
      [currentVersion]: bestResults,
      ...omit(jsonContent, [currentVersion]),
    },
    undefined,
    2,
  );
  writeFileSync(fwJsonPath, resultsString);
}
