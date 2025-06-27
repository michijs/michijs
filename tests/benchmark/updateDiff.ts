import vanillajs from "./results/vanillajs.json";
import michijs from "./results/michijs.json";
import { writeFileSync } from "fs";
import { currentVersion } from "../../tasks/currentVersion";
import type { Result } from "./shared";

export const updateDiff = () => {
  const diff = Object.entries(
    michijs[currentVersion] as Partial<Record<Result, number>>,
  ).reduce((previousValue, [key, value]) => {
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
