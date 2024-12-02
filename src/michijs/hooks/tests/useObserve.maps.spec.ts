import type { ObservableType } from "../../types";
import { useObserve } from "../useObserve";
import { describe, it, expect, jest, beforeEach, afterEach } from "bun:test";

const exampleValue = 1;
const mockCallback = jest.fn((x) => x);
describe("Observe map tests", () => {
  let nonProxiedMap: Map<any, any>;
  let map: ObservableType<Map<any, any>>;
  beforeEach(() => {
    mockCallback.mockClear();
    nonProxiedMap = new Map();
    map = useObserve(new Map());
    map.subscribe(mockCallback);
  });
  it("Setting the same value two times must call its callback just one time", () => {
    map[0] = exampleValue;
    map[0] = exampleValue;
    nonProxiedMap[0] = exampleValue;
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("Setting the same value two times must call its callback just one time (using set method)", () => {
    map.set(0, exampleValue);
    map.set(0, exampleValue);
    nonProxiedMap.set(0, exampleValue);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("Deleting an existing index should call the callback", () => {
    map.set(0, exampleValue);
    nonProxiedMap.set(0, exampleValue);
    map.delete(0);
    nonProxiedMap.delete(0);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
  it("Deleting an non-existent index should not call the callback", () => {
    map.delete(0);
    nonProxiedMap.delete(0);
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  it("Clearing a map with items should call the callback", () => {
    map.set(0, exampleValue);
    nonProxiedMap.set(0, exampleValue);
    map.clear();
    nonProxiedMap.clear();
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
  it("Clearing a map without items should not call the callback", () => {
    map.clear();
    nonProxiedMap.clear();
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  afterEach(() => {
    expect(map.size).toStrictEqual(nonProxiedMap.size);
    expect(Array.from(map())).toEqual(Array.from(nonProxiedMap));
    // Doesnt work with bun:test
    // expect(Array.from(map)).toEqual(Array.from(nonProxiedMap));
    expect(Object.keys(map)).toEqual(Object.keys(nonProxiedMap));
    // expect(Object.values(map)).toEqual(Object.values(nonProxiedMap));
  });
});
