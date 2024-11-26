import type { Result } from "./shared";
import vanillajs from "./results/vanillajs.json";
import { writeFileSync } from "fs";

export const updateDiff = (results: Partial<Record<Result, number>>) => {
  const diff = Object.entries(results).reduce((previousValue, [key, value]) => {
    // Bigger values are worst
    previousValue[key] = Math.max(
      0,
      Number((value - vanillajs[key]).toFixed(2)),
    );
    return previousValue;
  }, {});
  const diffString = JSON.stringify(diff, undefined, 2);
  console.log("Diff results: ", diffString);
  writeFileSync("./tests/benchmark/results/diff.json", diffString);
};
