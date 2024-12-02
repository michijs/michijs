import type {
    ObservableType,
  } from "../../types";
  import { useObserve } from "../useObserve";
  import { describe, it, expect, jest, beforeEach, afterEach } from "bun:test";
import { useObserveMutationTests } from "./useObserveMutation.spec";
import { useComputedObserve } from "../useComputedObserve";

const mockCallback = jest.fn((x) => x);
describe("Observe date tests", () => {
    let nonProxiedDate: Date;
    let date: ObservableType<Date>;
    beforeEach(() => {
        mockCallback.mockClear();
      nonProxiedDate = new Date();
      date = useObserve(new Date());
      date.subscribe(mockCallback);
    });

  useObserveMutationTests(() => new Date())
    it("Setting the same value two times must call its callback just one time", () => {
      const newExampleValue = date.getTime() + 1;
      date.setTime(newExampleValue);
      date.setTime(newExampleValue);
      nonProxiedDate.setTime(newExampleValue);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    it("Using useComputedObserve should keep it as a Date", () => {
      const computedDate = useComputedObserve(() => date, [date]);
      expect(computedDate.getTime()).toEqual(nonProxiedDate.getTime());
    });
    afterEach(() => {
      expect(date.getTime()).toEqual(nonProxiedDate.getTime());
      expect(Object.keys(date)).toEqual(Object.keys(nonProxiedDate));
      expect(Object.values(date)).toEqual(Object.values(nonProxiedDate));
    });
  });