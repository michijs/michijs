import vanillajs from "./results/vanillajs.json";
import { writeFileSync } from "fs";
import { currentVersion } from "../../tasks/currentVersion";
import type { Result } from "./shared";

export const updateDiff = async () => {
  const michijs = (await import("./results/michijs.json"))[
    currentVersion
  ] as Partial<Record<Result, number>>;
  if (michijs) {
    const diff = Object.entries(michijs).reduce(
      (previousValue, [key, value]) => {
        // Bigger values are worst
        previousValue[key] = Math.max(
          0,
          Number((value - vanillajs[key]).toFixed(2)),
        );
        return previousValue;
      },
      {},
    );
    const diffString = JSON.stringify(diff, undefined, 2);
    console.log("Diff results: ", diffString);
    writeFileSync("./tests/benchmark/results/diff.json", diffString);
  }
};
