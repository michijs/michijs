import { useObserve } from "../use-cases/hooks/useObserve";
import { describe, it, expect } from "bun:test";
import { startTracking, stopTracking } from "./dependencyTracker";

describe("Dependency tracker", () => {
  describe("Not proxied value", () => {
    const testValue = useObserve(true);
    it("should return the proper amount of trackers while getting tracked", () => {
      startTracking();
      testValue();
      expect(stopTracking().size).toStrictEqual(1);
    });
    it("should return the proper amount of trackers while calling valueOf", () => {
      startTracking();
      testValue.valueOf();
      expect(stopTracking().size).toStrictEqual(1);
    });
  });
  describe("Proxied value", () => {
    const testValue = useObserve(true, true);
    it("should return the proper amount of trackers while getting tracked", () => {
      startTracking();
      testValue();
      expect(stopTracking().size).toStrictEqual(1);
    });
    it("should return the proper amount of trackers while calling valueOf", () => {
      startTracking();
      testValue.valueOf();
      expect(stopTracking().size).toStrictEqual(1);
    });
  });
});
