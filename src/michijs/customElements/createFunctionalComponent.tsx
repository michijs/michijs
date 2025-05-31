import { useObserveInternal } from "../hooks/useObserve";
import { isObservable } from "../typeWards/isObservable";
import type {
  AnyObject,
  CreateFCResult,
  CreateFunctionalComponent,
  FCProps,
} from "../types";
import { unproxify } from "../utils/unproxify";

export function createFunctionalComponent<
  T extends AnyObject,
  S extends Element = Element,
>(callback: CreateFCResult<T, S>): CreateFunctionalComponent<T> {
  return (props, contextElement?: S, contextNamespace?: string) => {
    const newProps = Object.entries(props).reduce(
      (previousValue, [key, value]) => {
        if (key === "children") previousValue[key] = value;
        else if (isObservable(value)) {
          previousValue[key] = useObserveInternal(unproxify(value));
          value.subscribe((newValue) => (previousValue[key] = newValue));
        } else previousValue[key] = useObserveInternal(value);
        return previousValue;
      },
      {},
    );
    return callback(newProps as FCProps<T>, contextElement, contextNamespace);
  };
}
