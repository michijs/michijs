import { CSSObject } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";

export const cssVariablesFromCssObject = (
  cssObject: CSSObject,
  properties: string[] = [],
): Record<string, string> => {
  let obj = {};
  Object.entries(cssObject).forEach(([key, value]) => {
    if (valueIsCSSObject(value))
      obj = {
        ...obj,
        ...cssVariablesFromCssObject(value, properties.concat(key)),
      };
    else
      obj[
        `--${properties.length > 0 ? `${properties.join("-")}-` : ""}${key}`
      ] = value;
  });

  return obj;
};
