import { CSSObject } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";

export const convertCssObjectToCssVariablesObject = (
  cssObject: CSSObject,
  properties: string[] = [],
): CSSObject => {
  let obj = {};
  Object.keys(cssObject.valueOf()).forEach(key => {
    const value = cssObject[key];
    if (valueIsCSSObject(value))
      obj = {
        ...obj,
        ...convertCssObjectToCssVariablesObject(value, properties.concat(key)),
      };
    else
      obj[
        `--${properties.length > 0 ? `${properties.join("-")}-` : ""}${key}`
      ] = value;
  });

  return obj;
};
