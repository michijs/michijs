import type { ObservableOrConst } from "../types";
import { useComputedObserve } from "./useComputedObserve";

/**
 * It is used to create a string template by interpolating dynamic values.
 * @param templateStringsArray An array of strings representing the template literals.
 * @param props An array of dynamic values that will be interpolated into the template.
 * @returns A new observable
 */
export function useStringTemplate(
  templateStringsArray: TemplateStringsArray,
  ...props: (ObservableOrConst<string | number | undefined>)[]
) {
  return useComputedObserve(() => {
    return templateStringsArray.raw.reduce((previousValue, currentValue, i) => {
      const val = props[i];
      return `${previousValue}${currentValue}${val ? val.valueOf() ?? "" : ""}`;
      // The accumulator takes the first value if you don't pass a value as the second argument:
    }, "");
  }, props);
}
