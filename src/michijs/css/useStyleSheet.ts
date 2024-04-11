import { useComputedObserve, useObserve } from "../hooks";
import type {
  AnyObject,
  CSSObject,
  UseStyleSheet,
  UseStyleSheetCallback,
} from "../types";
import {
  formatToKebabCase,
  getObservables,
  bindObservable,
  unproxify,
  isNil,
} from "../utils";
import { useCssVariables } from "./useCssVariables";

const pseudoSelectors = [":host", ":host-context", "::"];

const isQuery = (key: string) => key.startsWith("@");

export const pseudoSelectorToText = (
  unproxifiedCssObject: CSSObject,
  parentSelector = "",
): string => {
  const thisRunObjectSelector = {};
  const otherRunsSelectors = Object.entries(unproxifiedCssObject).reduce(
    (previousValue, [key, value]) => {
      if (!isNil(value)) {
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
            return `${previousValue}${pseudoSelectorToText(
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
      if (pseudoSelectors.find((x) => key.startsWith(x))) {
        hostRules = `${hostRules}${pseudoSelectorToText(
          value as CSSObject,
          key,
        )}`;
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

const styleSheetFromCSSObject = (
  getCSSObject: () => CSSObject,
  additionalObservers: any[] = [],
) => {
  const styleSheet = new CSSStyleSheet();
  const observables = getObservables(getCSSObject());
  const stringResult = useComputedObserve(
    () => cssObjectToText(getCSSObject()),
    [...observables, ...additionalObservers],
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
) => {
  if (typeof cssObject === "function") {
    const tags = useObserve(new Set<string>());
    let styleSheet;
    return (tag) => {
      tags.add(tag);
      if (!styleSheet) {
        const cssVariables = useCssVariables<AnyObject>();
        styleSheet = styleSheetFromCSSObject(
          () => cssObject(Array.from(tags).join(","), cssVariables),
          [tags],
        );
      }
      return styleSheet as (tag: string) => CSSStyleSheet;
    };
  } else return styleSheetFromCSSObject(() => cssObject);
}) as UseStyleSheet;
