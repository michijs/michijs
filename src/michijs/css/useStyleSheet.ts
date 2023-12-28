import { useComputedObserve } from "../hooks";
import type { CSSObject } from "../types";
import {
  formatToKebabCase,
  getObservables,
  bindObservable,
  unproxify,
} from "../utils";

export function cssObjectToText(
  cssObject: CSSObject,
  isChild?: boolean,
): string {
  const unproxifiedCssObject = unproxify(cssObject);
  const formattedObject = Object.entries(unproxifiedCssObject).reduce(
    (previousValue, [key, value]) => {
      const valueIsObject = typeof value === "object";
      const isQuery = key.startsWith("@");
      const newKey = formatToKebabCase(
        isChild && !isQuery && valueIsObject ? `&${key}` : key,
      );
      const newValue = valueIsObject
        ? `{${cssObjectToText(value as CSSObject, isChild || !isQuery)}}`
        : `:${value?.toString()};`;
      return `${previousValue}${newKey}${newValue}`;
    },
    "",
  );
  return formattedObject;
}

/**Allows to create a Constructable Stylesheet with a CSSObject */
export function useStyleSheet(cssObject: CSSObject) {
  const styleSheet = new CSSStyleSheet();
  const observables = getObservables(cssObject);
  const stringResult = useComputedObserve(
    () => cssObjectToText(cssObject),
    observables,
  );

  bindObservable(stringResult, (formattedObject) => {
    // Jest fix
    if (styleSheet.replaceSync) styleSheet.replaceSync(formattedObject);

    const result = styleSheet.cssRules.item(0)?.cssText;
    if ((result?.length ?? 0) < formattedObject.length)
      console.error(`Error on stylesheet: ${formattedObject}`)
  });

  return styleSheet;
}
