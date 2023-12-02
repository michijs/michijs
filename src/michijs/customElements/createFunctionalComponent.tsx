import { useObserve } from "../hooks";
import { isObservableType } from "../typeWards/isObservableType";
import { AnyObject, CreateOptions, FC, ObservableProps } from "../types";
import { unproxify } from "../utils";

export function createFunctionalComponent<T extends AnyObject, S extends Element = Element, C = CreateOptions<S>>(callback: FC<T, S, C>): ((props: ObservableProps<T>) => JSX.Element) {
  return ((props) => {
    const newProps = Object.entries(props).reduce((previousValue, [key, value]) => {
      if (key === 'children')
        previousValue[key] = value
      else if (isObservableType(value)) {
        previousValue[key] = useObserve(unproxify(value))
        value.subscribe((newValue) => previousValue[key] = newValue)
      } else
        previousValue[key] = useObserve(value)
      return previousValue
    }, {})
    return callback(newProps as any)
  }) as ((props: ObservableProps<T>) => JSX.Element)
}