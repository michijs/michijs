import { useObserve } from "..";

const STR1 = "Hello, ";
const STR2 = "World!";
const OBSERVE_STR1 = useObserve(STR1);

describe("String expressions and operators", () => {
  it("should concatenate two strings", () => {
    expect(OBSERVE_STR1 + STR2).toBe(STR1 + STR2);
  });
  // it("should check if a string contains a substring", () => {
  //   expect(OBSERVE_STR1.includes(SUBSTRING)).toBe(true);
  // });

  it("should return the length of a string", () => {
    expect(OBSERVE_STR1.length).toStrictEqual(STR1.length);
  });
  it("should return 'o' for 'Hello'[4]", () => {
    expect(OBSERVE_STR1[4]).toStrictEqual("o");
  });
  it("should return proper type", () => {
    expect(OBSERVE_STR1.typeof?.()).toStrictEqual("string");
  });
});
