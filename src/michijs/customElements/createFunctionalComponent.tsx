import { useObserveInternal } from "../hooks/useObserve";
import { isObservableType } from "../typeWards/isObservableType";
import type {
  AnyObject,
  CreateFCResult,
  CreateFunctionalComponent,
} from "../types";
import { unproxify } from "../utils/unproxify";

export function createFunctionalComponent<
  T extends AnyObject,
  S extends Element = Element,
>(
  callback: CreateFCResult<T, S>,
  contextElement?: S,
  contextNamespace?: string,
): CreateFunctionalComponent<T> {
  return (props) => {
    // TODO: Not sure why ts compiler is complaining here
    // @ts-ignore
    const newProps = Object.entries(props).reduce(
      (previousValue, [key, value]) => {
        if (key === "children") previousValue[key] = value;
        else if (isObservableType(value)) {
          previousValue[key] = useObserveInternal(unproxify(value));
          value.subscribe((newValue) => (previousValue[key] = newValue));
        } else previousValue[key] = useObserveInternal(value);
        return previousValue;
      },
      {},
    );
    return callback(newProps as any, contextElement, contextNamespace);
  };
}
