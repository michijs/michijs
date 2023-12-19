import { useCssVariables } from "./useCssVariables";
import { cssObjectToText } from "./useStyleSheet";

const [cssVariables, defaultValues] = useCssVariables({ test: "green" });
const stylesheet = cssObjectToText({
  div: {
    [cssVariables.test]: defaultValues.test,
    backgroundColor: cssVariables.test(),
    ":not([test-attribute])": {
      color: "red",
    },
    "@media (max-width: 600px)": {
      color: "blue",
    },
  },
});

const expectedResult =
  "div{--test:green;background-color:var(--test);&:not([test-attribute]){color:red;}@media (max-width: 600px){color:blue;}}";

describe("useStyleSheet", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet).toStrictEqual(expectedResult);
  });
});
