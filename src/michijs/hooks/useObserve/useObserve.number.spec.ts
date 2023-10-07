import { useObserve } from "../";

const NUM1 = 2;
const NUM2 = 4;
const OBSERVE_NUM1 = useObserve(NUM1);
const OBSERVE_NUM2 = useObserve(NUM2);
const OBSERVE_NUM3 = useObserve(-NUM1);

describe("Number expressions and operators", () => {
  it("should add two numbers", () => {
    expect(OBSERVE_NUM1 + OBSERVE_NUM2).toBe(NUM1 + NUM2);
  });

  it("should subtract two numbers", () => {
    expect(OBSERVE_NUM1 - OBSERVE_NUM2).toBe(NUM1 - NUM2);
  });

  it("should multiply two numbers", () => {
    expect(OBSERVE_NUM1 * NUM2).toBe(NUM1 * NUM2);
  });

  it("should divide two numbers", () => {
    expect(OBSERVE_NUM2 / NUM1).toBe(NUM2 / NUM1);
  });

  it("should check if a number is greater than another", () => {
    expect(OBSERVE_NUM2 > NUM1).toBe(true);
  });

  it("should check if a number is less than another", () => {
    expect(NUM1 < OBSERVE_NUM2).toBe(true);
  });

  it("should return true for OBSERVE_NUM1 == NUM1", () => {
    expect(OBSERVE_NUM1 == NUM1).toBe(true);
  });

  it("should return true for OBSERVE_NUM1.is(NUM1)", () => {
    expect(OBSERVE_NUM1.is?.(NUM1)).toBe(true);
  });

  it("should return true for OBSERVE_NUM1 <= NUM1", () => {
    expect(OBSERVE_NUM1 <= NUM1).toBe(true);
  });

  it("should return true for OBSERVE_NUM2 >= NUM1", () => {
    expect(OBSERVE_NUM2 >= NUM1).toBe(true);
  });

  it("should return NUM1 for Math.abs(OBSERVE_NUM3)", () => {
    expect(Math.abs(OBSERVE_NUM3)).toBe(NUM1);
  });
});