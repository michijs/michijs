import { isObservableType } from "../typeWards/isObservableType";
import { ObservableType } from "../types";
import { useComputedObserve } from "./useComputedObserve";

export function useStringTemplate(templateStringsArray: TemplateStringsArray, ...props: (ObservableType<string | number> | string | number)[]) {
  return useComputedObserve(() => {
    return templateStringsArray.raw.reduce((previousValue, currentValue, i) => {
      return `${previousValue}${currentValue}${props[i]?.valueOf() ?? ''}`;
      // The accumulator takes the first value if you don't pass a value as the second argument:
    }, "")
  }, props.filter(x => isObservableType(x)) as ObservableType<string | number>[])
}