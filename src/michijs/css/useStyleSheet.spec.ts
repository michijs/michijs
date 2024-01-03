import { useCssVariables } from "./useCssVariables";
import { cssObjectToText } from "./useStyleSheet";

const cssVariables = useCssVariables();
const stylesheet = cssObjectToText({
  div: {
    [cssVariables.test]: "green",
    backgroundColor: cssVariables.test(),
    ":not([test-attribute])": {
      color: "red",
    },
    "@media (max-width: 600px)": {
      color: "blue",
    },
  },
  ":host": {
    "@media (max-width: 600px)": {
      " a": {
        color: "green",
      },
    },
    "([hidden])": {
      display: "none",
    },
  },
});

const expectedResult =
  "div{--test:green;background-color:var(--test);&:not([test-attribute]){color:red;}@media (max-width: 600px){color:blue;}}@media (max-width: 600px){:host a{color:green;}}:host([hidden]){display:none;}";

describe("useStyleSheet", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet).toStrictEqual(expectedResult);
  });
});
