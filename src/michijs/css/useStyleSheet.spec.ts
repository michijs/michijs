import { useCssVariables } from "./useCssVariables";
import { cssObjectToText } from "./useStyleSheet";

const [cssVariables, defaultValues] = useCssVariables({ test: 'green' });
const stylesheet = cssObjectToText({
  div: {
    [cssVariables.test]: defaultValues.test,
    background: cssVariables.test.var()
  }
})

const expectedResult = 'div{--test:green;background:var(--test)}';

describe("useStyleSheet", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet).toStrictEqual(expectedResult);
  });
});