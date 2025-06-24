import { create } from "../../DOM/create/create";
import type { ObservableType } from "../../types";
import { useObserve } from "../useObserve";
import { describe, it, expect, beforeEach } from "bun:test";
import { sharedObjectTests } from "./useObserveSharedObjectTests.spec";

const exampleValue = 1;
const exampleValue2 = 2;

describe("Observe array tests", () => {
  let array: ObservableType<Array<number>>;
  let node: Node;
  let jsonNode: Node;

  sharedObjectTests(() => []);

  beforeEach(() => {
    array = useObserve(new Array<number>());
    array.push(exampleValue);
    node = array.List({
      as: "div",
      renderItem: (item) => <div>{item}</div>,
    });
    jsonNode = create(<>{array}</>);
  });
  function expectResult(result: number[]) {
    expect(array()).toStrictEqual(result);
    result.forEach((x, i) =>
      expect(node.childNodes.item(i).textContent).toBe(x.toString()),
    );
    expect(node.childNodes.length).toBe(result.length);
    expect(jsonNode.textContent).toBe(JSON.stringify(result));
  }
  it("First item should return the expected value", () => {
    expect(array[0]()).toBe(exampleValue);
  });
  it("Pop function should work for array and the node as expected", () => {
    array.push(exampleValue2);
    array.pop();
    expectResult([1]);
  });
  it("Push function should work for array and the node as expected", () => {
    array.push(exampleValue2);
    expectResult([exampleValue, exampleValue2]);
  });
  it("Reverse function should work for array and the node as expected", () => {
    array.push(exampleValue2);
    array.reverse();
    expectResult([exampleValue2, exampleValue]);
  });
  it("Shift function should work for array and the node as expected", () => {
    array.push(exampleValue2);
    array.shift();
    expectResult([exampleValue2]);
  });
  it("Unshift function should work for array and the node as expected", () => {
    array.unshift(exampleValue2);
    expectResult([exampleValue2, 1]);
  });
  it("Fill function should work for array and the node as expected", () => {
    array.fill(exampleValue2, 0, 1);
    expectResult([exampleValue2]);
  });
  it("Sort function should work for array and the node as expected", () => {
    array.push(5, 4, 3, 6, 9, 8);
    const result = [exampleValue, 5, 4, 3, 6, 9, 8].sort();
    array.sort();
    expectResult(result);
    array.sort((a, b) => b() - a());
    expectResult(result.sort((a, b) => b - a));
  });
  it("Splice function should work for array and the node as expected", () => {
    array.push(2, 8, 4, 5, 6);
    array.splice(2, 1, 3);
    expectResult([1, 2, 3, 4, 5, 6]);
    array.splice(-1, 1, 30);
    expectResult([1, 2, 3, 4, 5, 30]);
    array.splice(1, -1, 25);
    expectResult([1, 25, 2, 3, 4, 5, 30]);
    array.splice(1, 1);
    expectResult([1, 2, 3, 4, 5, 30]);
  });
  it("set function should work for array and the node as expected", () => {
    const result = [2, 8, 4, 5, 6];
    array(result);
    expectResult(result);
  });
});
