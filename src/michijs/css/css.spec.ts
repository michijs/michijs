import { useStringTemplate } from "../hooks/useStringTemplate";
import { useCssVariables } from "./useCssVariables";
import {describe, it, expect} from 'bun:test'

const cssVariables = useCssVariables();
const stylesheet = useStringTemplate`div{${
  cssVariables.test
}:green;background:${cssVariables.test()}}`;

const expectedResult = "div{--test:green;background:var(--test)}";

describe("css", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet()).toBe(expectedResult);
  });
});
