import { useCssVariables } from "./useCssVariables";
import { cssObjectToText } from "./useStyleSheet";
import { describe, it, expect } from "bun:test";

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
    ".textClass": {
      WebkitAlignItems: "center",
    },
    "::before": {
      "@media (prefers-reduced-motion: no-preference)": {
        opacity: 1,
      },
      opacity: 0,
    },
    "div::after": {
      "@media (prefers-reduced-motion: no-preference)": {
        opacity: 1,
      },
      opacity: 0,
    },
  },
  ":host": {
    "@media (max-width: 600px)": {
      " a": {
        color: "green",
      },
    },
    "(.textClass)": {
      WebkitAlignItems: "center",
    },
    "([hidden])": {
      display: "none",
    },
  },
});

const expectedResult =
  "div{--test:green;background-color:var(--test);&:not([test-attribute]){color:red;}@media (max-width: 600px){color:blue;}&.textClass{-webkit-align-items:center;}@media (prefers-reduced-motion: no-preference){&::before{opacity:1;}}&::before{opacity:0;}@media (prefers-reduced-motion: no-preference){&div::after{opacity:1;}}&div::after{opacity:0;}}@media (max-width: 600px){:host a{color:green;}}:host(.textClass){-webkit-align-items:center;}:host([hidden]){display:none;}";

describe("useStyleSheet", () => {
  it("should return the expected css variables text", () => {
    expect(stylesheet).toStrictEqual(expectedResult);
  });
});
