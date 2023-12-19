import { CSSProperty } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";
import { formatToKebabCase } from "../utils";

export const convertCssObjectToCssVariablesObject = (
  cssObject: CSSProperty,
  properties: string[] = [],
): Record<string, string> => {
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
          formatToKebabCase(`--${properties.length > 0 ? `${properties.join("-")}-` : ""}${key}`)
        ] = value;
    },
  );

  return obj;
};
