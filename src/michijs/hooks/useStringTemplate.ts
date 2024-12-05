import type { UseStringTemplate } from "../types";
import { useComputedObserve } from "./useComputedObserve";

/**
 * It is used to create a string template by interpolating dynamic values.
 * @param templateStringsArray An array of strings representing the template literals.
 * @param props An array of dynamic values that will be interpolated into the template.
 * @returns A new observable
 */
export const useStringTemplate: UseStringTemplate = (
  templateStringsArray,
  ...props
) =>
  useComputedObserve(
    () =>
      templateStringsArray.raw.reduce(
        (previousValue, currentValue, i) =>
          `${previousValue}${currentValue}${props[i] ? (props[i].valueOf() ?? "") : ""}`,
        // The accumulator takes the first value if you don't pass a value as the second argument:
        "",
      ),
    props,
  );
