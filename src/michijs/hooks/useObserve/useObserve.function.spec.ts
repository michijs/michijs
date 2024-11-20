import { useObserve } from "../useObserve";
import { describe, it, expect } from "bun:test";

const obj = useObserve({
  text: "a",
  testFunction() {
    return obj.text();
  },
});

const effect = obj.testFunction();

describe("Functions", () => {
  it("should return the same value than the object is listening to", () => {
    expect(effect()).toStrictEqual(obj.text());
  });
  it("should listen for changes and update accordingly", () => {
    obj.text("b");
    expect(effect()).toStrictEqual(obj.text());
  });
});
