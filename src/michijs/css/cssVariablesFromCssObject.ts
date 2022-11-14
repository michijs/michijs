import { CSSObject } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";
import { formatToKebabCase } from "../utils";

export const cssVariablesFromCssObject = (cssObject: CSSObject, selectors: string[] = []): Record<string, string> => {
  let obj = {};
  Object.entries(cssObject).forEach(([key, value]) => {
    if (valueIsCSSObject(value)) {
      obj = {...obj, ...cssVariablesFromCssObject(value, selectors.concat(key))}
    } else{
      obj[`--${selectors.join('-')}-${formatToKebabCase(key)}`] = value;
    }
  });

  return obj;
}
