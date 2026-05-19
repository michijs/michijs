import type { ObservableProxiedComplexObjectPort } from "#ports";
import { useObserve } from "../useObserve";
import { describe, it, expect, jest, beforeEach } from "bun:test";
import { sharedObjectTests } from "./useObserveSharedObjectTests.spec";

const mockCallback = jest.fn((x) => x);

describe("Observe object tests", () => {
  beforeEach(() => {
    mockCallback.mockClear();
  });
  sharedObjectTests(() => ({}));

  it("Assigning a new value to the object should ensure its child properties remain observable", () => {
    const a = useObserve({ test: 0 }, true);
    a({ test: 43 });
    expect(typeof a.test).toStrictEqual("function");
  });
  it("Setting two object values should only notify a single time", () => {
    const a = useObserve({}, true);
    a.subscribe(mockCallback);
    a({ a: 1, b: 2 });
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("Reassigning the whole object should notify subscribers of existing child properties", () => {
    const a = useObserve({ b: 1 }, true);

    const childCb = jest.fn();
    a.b.subscribe(childCb);
    a({ b: 2 });
    expect(childCb).toHaveBeenCalledTimes(1);
    expect(childCb).toHaveBeenLastCalledWith(2);
  });

  describe("with nullable fields", () => {
    const object = useObserve<
      | {
          test: {
            test2: undefined | number;
          } | null;
        }
      | undefined
    >(undefined, true);
    it("Getting test doesnt throw exception", () => {
      expect(() => object.test.test2).not.toThrow();
      expect(object.test.test2()).toBe(undefined);
      expect(object()).toStrictEqual({ test: { test2: undefined } });
      object.test.test2(1);
      expect(object()).toStrictEqual({ test: { test2: 1 } });
      object.test(null);
      expect(object()).toStrictEqual({ test: null });
      object.test({ test2: undefined });
      expect(object()).toStrictEqual({ test: { test2: undefined } });
    });
  });
  describe("With Complex values", () => {
    const obj = useObserve<ObservableProxiedComplexObjectPort<File>>(
      new File(
        [""],
        "test",
      ) as unknown as ObservableProxiedComplexObjectPort<File>,
      true,
    );

    it("Getting the value should return same instance type", () => {
      expect(obj()).toBeInstanceOf(File);
    });
    it("Getting the value name should return same name", () => {
      expect(obj.name).toBe("test");
    });
  });
});
