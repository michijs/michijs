import { useComputedObserve } from "../hooks";
import type { CSSObject } from "../types";
import { formatToKebabCase, getObservables, bindObservable } from "../utils";

export function cssObjectToText(cssObject: CSSObject, isChild?: boolean) {
  const formattedObject = Object.entries(cssObject).reduce((previousValue, [key, value]) => {
    const valueIsObject = typeof value?.valueOf() === 'object';
    const newKey = formatToKebabCase(isChild && !key.startsWith('@') && valueIsObject ? `&${key}`: key);
    const newValue = valueIsObject ? `{${cssObjectToText(value as CSSObject, true)}}`: `:${value?.toString()};`
    return `${previousValue}${newKey}${newValue}`
  }, '');
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
  });

  return styleSheet;
}
