import { useObserveInternal } from "../hooks/useObserve";
import type {
  AnyObject,
  CSSObject,
  UseStyleSheet,
  UseStyleSheetCallback,
} from "../types";
import { bindObservable } from "../utils/bindObservable";
import { getObservables } from "../utils/getObservables";
import { isNil } from "../utils/isNil";
import { unproxify } from "../utils/unproxify";
import { useCssVariables } from "./useCssVariables";
import { ProxiedValue } from "../classes/ProxiedValue";
import { formatToKebabCase } from "../utils/formatToKebabCase";
import { useComputedObserve } from "../hooks/useComputedObserve";

const hostSelectors = [":host", ":host-context"];

const isQuery = (key: string) => key.startsWith("@");

export const hostToText = (
  unproxifiedCssObject: CSSObject,
  parentSelector = "",
): string => {
  const thisRunObjectSelector = {};
  const otherRunsSelectors = Object.entries(unproxifiedCssObject).reduce(
    (previousValue, [key, value]) => {
      if (!isNil(value)) {
        const valueIsObject = typeof value === "object";
        const isQueryResult = isQuery(key);
        if (valueIsObject) {
          if (isQueryResult)
            return `${previousValue}${cssObjectToText({
              [key]: {
                [parentSelector]: value,
              },
            })}`;

          return `${previousValue}${hostToText(
            value as CSSObject,
            `${parentSelector}${key}`,
          )}`;
        }
        thisRunObjectSelector[formatToKebabCase(key)] = value;
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
      }
      const valueIsObject = typeof value === "object";
      const isQueryResult = isQuery(key);
      let newKey = isChild && !isQueryResult && valueIsObject ? `&${key}` : key;
      let newValue;
      let queries = "";

      if (valueIsObject) {
        const valueAsCssObject: CSSObject = value as CSSObject;
        let valueToStringify: CSSObject;
        // Preudo selectors doesnt support @media inside
        if (key.includes("::")) {
          valueToStringify = {};
          // Separate media from the rest
          for (const [key, internalValue] of Object.entries(valueAsCssObject)) {
            if (key.startsWith("@"))
              queries += `${key}{${newKey}{${cssObjectToText(
                internalValue as CSSObject,
                isChild || !isQueryResult,
              )}}}`;
            else valueToStringify[key] = internalValue;
          }
        } else valueToStringify = valueAsCssObject;

        newValue = `{${cssObjectToText(
          valueToStringify,
          isChild || !isQueryResult,
        )}}`;
      } else {
        newKey = formatToKebabCase(newKey);
        newValue = `:${value?.toString()};`;
      }

      return `${previousValue}${queries}${newKey}${newValue}`;
    },
    "",
  );
  return `${formattedObject}${hostRules}`;
}

const styleSheetFromCSSObject = (
  getCSSObject: () => CSSObject,
  additionalObservers: any[] = [],
  $window: Window & typeof globalThis = window as Window & typeof globalThis,
) => {
  const styleSheet = new $window.CSSStyleSheet();
  const observables = getObservables(getCSSObject());
  const stringResult = useComputedObserve(
    () => cssObjectToText(getCSSObject()),
    [...observables, ...additionalObservers],
    { usePrimitive: true },
  );
  bindObservable(stringResult, (formattedObject) => {
    // Jest fix
    if (styleSheet.replaceSync) styleSheet.replaceSync(formattedObject);
  });
  return styleSheet;
};
/**Allows to create a Constructable Stylesheet with a CSSObject */
export const useStyleSheet = ((
  cssObject: UseStyleSheetCallback<AnyObject> | CSSObject,
  $window: Window & typeof globalThis = window as Window & typeof globalThis
) => {
  if (typeof cssObject === "function" && !(cssObject instanceof ProxiedValue)) {
    const tags = useObserveInternal(new Set<string>());
    let styleSheet;
    return (tag) => {
      tags.add(tag);
      if (!styleSheet) {
        const cssVariables = useCssVariables<AnyObject>();
        styleSheet = styleSheetFromCSSObject(
          () => cssObject(Array.from(tags).join(","), cssVariables),
          [tags],
          $window
        );
      }
      return styleSheet as (tag: string) => CSSStyleSheet;
    };
  }
  return styleSheetFromCSSObject(() => cssObject as CSSObject, [], $window);
}) as UseStyleSheet;
