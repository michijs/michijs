import { useComputedObserve } from "../hooks";
import type { CSSObject } from "../types";
import {
  formatToKebabCase,
  getObservables,
  bindObservable,
  unproxify,
} from "../utils";

const hostSelectors = [":host", ":host-context"];

const isQuery = (key: string) => key.startsWith("@");

export const hostToText = (
  unproxifiedCssObject: CSSObject,
  parentSelector = "",
): string => {
  const thisRunObjectSelector = {};
  const otherRunsSelectors = Object.entries(unproxifiedCssObject).reduce(
    (previousValue, [key, value]) => {
      if (value) {
        const valueIsObject = typeof value === "object";
        const newKey = formatToKebabCase(key);
        const isQueryResult = isQuery(newKey);
        if (valueIsObject) {
          if (isQueryResult)
            return `${previousValue}${cssObjectToText({
              [newKey]: {
                [parentSelector]: value,
              },
            })}`;
          else
            return `${previousValue}${hostToText(
              value as CSSObject,
              `${parentSelector}${newKey}`,
            )}`;
        } else {
          thisRunObjectSelector[newKey] = value;
        }
      }
      return previousValue;
    },
    "",
  );
  const thisRunObjectSelectorEntries = Object.entries(thisRunObjectSelector);
  const thisRunSelector =
    thisRunObjectSelectorEntries.length > 0
      ? `${parentSelector}{${thisRunObjectSelectorEntries.reduce(
          (previousValue, [key, value]) => {
            return `${previousValue}${key}:${value};`;
          },
          "",
        )}}`
      : "";

  return `${otherRunsSelectors}${thisRunSelector}`;
};

export function cssObjectToText(
  cssObject: CSSObject,
  isChild?: boolean,
): string {
  const unproxifiedCssObject = unproxify(cssObject);
  let hostRules = "";
  const formattedObject = Object.entries(unproxifiedCssObject).reduce(
    (previousValue, [key, value]) => {
      // & its not working for host
      if (hostSelectors.find((x) => key.startsWith(x))) {
        hostRules = `${hostRules}${hostToText(value as CSSObject, key)}`;
        return previousValue;
      } else {
        const valueIsObject = typeof value === "object";
        const isQueryResult = isQuery(key);
        const newKey = formatToKebabCase(
          isChild && !isQueryResult && valueIsObject ? `&${key}` : key,
        );
        const newValue = valueIsObject
          ? `{${cssObjectToText(
              value as CSSObject,
              isChild || !isQueryResult,
            )}}`
          : `:${value?.toString()};`;
        return `${previousValue}${newKey}${newValue}`;
      }
    },
    "",
  );
  return `${formattedObject}${hostRules}`;
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
      console.error(`Error on stylesheet: ${formattedObject}`);
  });

  return styleSheet;
}
