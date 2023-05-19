import type { CSSProperties } from "@michijs/htmltype";
import { CSSObject } from "../types";
import { ruleListFromCssObject } from "./ruleListFromCssObject";

// Cannot extend or use proxy with CSSStyleSheet :(
/**Allows to update a Constructable Stylesheet with a CSSObject */
export const updateStyleSheet = (
  styleSheet: CSSStyleSheet,
  cssObject: CSSObject | CSSProperties,
  selectors?: string[],
) => {
  const rules = ruleListFromCssObject(cssObject, selectors);
  styleSheet.replaceSync(rules.join(""));
  return styleSheet;
};
