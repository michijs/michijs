import { CSSObject, CSSProperty } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";

export const convertCssObjectToCssVariablesObject = (
  cssObject: CSSObject,
  properties: string[] = [],
): CSSObject => {
  const notObservableCssObject = JSON.parse(JSON.stringify(cssObject));
  let obj = {};
  Object.entries<CSSProperty>(notObservableCssObject).forEach(
    ([key, value]) => {
      if (valueIsCSSObject(value))
        obj = {
          ...obj,
          ...convertCssObjectToCssVariablesObject(
            value,
            properties.concat(key),
          ),
        };
      else
        obj[
          `--${properties.length > 0 ? `${properties.join("-")}-` : ""}${key}`
        ] = value;
    },
  );

  return obj;
};
