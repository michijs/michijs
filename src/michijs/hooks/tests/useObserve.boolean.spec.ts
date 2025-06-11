import { useObserve } from "../useObserve";
import { describe, it, expect } from "bun:test";
import { useObserveMutationTests } from "./useObserveMutation.spec";

const TRUE_VALUE = useObserve(true);
const FALSE_VALUE = useObserve(false);

describe("Observe boolean - expressions and operators", () => {
  useObserveMutationTests(() => false);
  it("should return true for true", () => {
    // Doesnt work with bun:test
    // expect(TRUE_VALUE).toStrictEqual(true);
    expect(TRUE_VALUE()).toStrictEqual(true);
  });
  it("should return false for false", () => {
    // Doesnt work with bun:test
    // expect(FALSE_VALUE).toStrictEqual(false);
    expect(FALSE_VALUE()).toStrictEqual(false);
  });
  it("should return proper type", () => {
    expect(TRUE_VALUE.typeof()).toStrictEqual("boolean");
  });
});
