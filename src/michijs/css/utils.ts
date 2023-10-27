import { CSSObject } from "../types";

const hostSelector = ":host";
export function host(cssObject: CSSObject) {
  return Object.entries(cssObject).reduce<CSSObject>(
    (previousValue, [key, value]) => {
      if (key.startsWith("(")) previousValue[`${hostSelector}${key}`] = value;
      else
        previousValue[hostSelector] = {
          ...(previousValue[hostSelector] as object),
          [key]: value,
        };
      return previousValue;
    },
    {} as CSSObject,
  );
}
