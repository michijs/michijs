import { CSSObject } from "../types";
import { ruleListFromCssObject } from "./ruleListFromCssObject";

// Cannot extend or use proxy with CSSStyleSheet :(
/**Allows to update a Constructable Stylesheet with a CSSObject */
export const updateStyleSheet = (styleSheet: CSSStyleSheet, cssObject: CSSObject) => {
    const rules = ruleListFromCssObject(cssObject);
    styleSheet.replaceSync(rules.join(''))
    return styleSheet
};