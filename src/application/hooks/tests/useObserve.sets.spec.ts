import "../../types";
import "../useObserve";
import { describe, it, expect, jest, beforeEach, afterEach } from "bun:test";

const exampleValue = 1;
const mockCallback = jest.fn((x) => x);
describe("Observe set tests", () => {
  let nonProxiedSet: Set<number>;
  let set: ObservableType<Set<number>>;
  beforeEach(() => {
    mockCallback.mockClear();
    nonProxiedSet = new Set<number>();
    set = useObserve(new Set<number>());
    set.subscribe(mockCallback);
  });
  // Non proxied set its not allowing assignations now for some reason
  it("Setting the same value two times must call its callback just one time", () => {
    set[0] = exampleValue;
    set[0] = exampleValue;
    nonProxiedSet[0] = exampleValue;
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("Adding the same value two times must call its callback just one time (using add method)", () => {
    set.add(exampleValue);
    set.add(exampleValue);
    nonProxiedSet.add(exampleValue);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
  it("Deleting an existing index should call the callback", () => {
    set.add(exampleValue);
    nonProxiedSet.add(exampleValue);
    set.delete(exampleValue);
    nonProxiedSet.delete(exampleValue);
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
  it("Deleting an non-existent index should not call the callback", () => {
    set.delete(exampleValue);
    nonProxiedSet.delete(exampleValue);
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  it("Clearing a set with items should call the callback", () => {
    set.add(exampleValue);
    nonProxiedSet.add(exampleValue);
    set.clear();
    nonProxiedSet.clear();
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
  it("Clearing a set without items should not call the callback", () => {
    set.clear();
    nonProxiedSet.clear();
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  afterEach(() => {
    expect(set.size).toStrictEqual(nonProxiedSet.size);
    // Doesnt work with bun:test
    // expect(Array.from(set)).toEqual(Array.from(nonProxiedSet));
    expect(Object.keys(set)).toEqual(Object.keys(nonProxiedSet));
    // expect(Object.values(set)).toEqual(Object.values(nonProxiedSet));
  });
});
