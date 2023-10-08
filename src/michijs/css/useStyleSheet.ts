import { useComputedObserve } from "../hooks";
import type { CSSObject } from "../types";
import { formatToKebabCase, getObservables, bindObservable } from "../utils";

/**Allows to create a Constructable Stylesheet with a CSSObject */
export function useStyleSheet (
  cssObject: CSSObject,
) {
  const styleSheet = new CSSStyleSheet();
  const observables = getObservables(cssObject);
  const stringResult = useComputedObserve(() => {
    const formattedObject = formatToKebabCase(JSON.stringify(cssObject))
      // Example "--example":"\\"red\\""
      .replaceAll("\\", "")
      // Only not double ""
      .replace(/(?<!")"(?!")/g, "")
      .replaceAll('""', '"')
      .replaceAll(":{", "{")
      .replaceAll(",", ";")
      .replaceAll("};", `}`);
    // Removing initial and final { }
    return formattedObject.slice(1, formattedObject.length - 1);
  }, observables);

  bindObservable(stringResult, (formattedObject) =>
    styleSheet.replaceSync(formattedObject),
  );

  return styleSheet;
};
