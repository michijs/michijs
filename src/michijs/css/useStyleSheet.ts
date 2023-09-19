import { useComputedObserve } from "../hooks";
import { bindObservable } from "../utils";
import { CSSObject } from "../types";
import { formatToKebabCase } from "../utils";
import { inspectForObservables } from "../utils/inspectForObservables";

/**Allows to create a Constructable Stylesheet with a CSSObject */
export const useStyleSheet = (
  cssObject: CSSObject,
) => {
  const styleSheet = new CSSStyleSheet();
  const observables = inspectForObservables(cssObject);
  const stringResult = useComputedObserve(() => {
    const formattedObject = formatToKebabCase(JSON.stringify(cssObject))
    // Example "--example":"\\"red\\""
    .replaceAll('\\', '')
    // Only not double ""
    .replace(/(?<!")"(?!")/g, '')
    .replaceAll('""', '"')
    .replaceAll(':{', '{')
    .replaceAll(',', ';')
    .replaceAll('};', `}`);
    // Removing initial and final { }
    return formattedObject.slice(1, formattedObject.length -1);
  }, observables)

  bindObservable(stringResult, (formattedObject) => styleSheet.replaceSync(formattedObject))
  
  return styleSheet;
};
