import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
import { useComputedObserve } from "../useComputedObserve";
import { setObservableValue } from "../../utils/setObservableValue";
import { useObserveInternal } from "../useObserve";

/**
 * **Warning** Still WIP - do not use in productino
 */
export function observePrimitiveValue<T>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  rootObservableCallback?: () => ObservableType<any>
): ObservableType<T> {
  const target = new ProxiedValue(
    item,
    parentSubscription,
    (...args) => {
      const valueType = typeof target.$value;
      if (valueType === "function") {
      // if (valueType === "function" && !(target.$value instanceof ProxiedValue)) {
        if (rootObservableCallback)
          return useComputedObserve(
            // @ts-ignore
            () => target.$value(...args),
            [rootObservableCallback()],
          );
          // @ts-ignore
        else return target.$value(...args);
      }
      if (args.length > 0) {
        const newValue = args[0];
        if (target.$value && valueType === "object")
          setObservableValue(
            target,
            newValue,
            parentSubscription as ParentSubscription<any>,
            rootObservableCallback,
          );
        else
        target.$value = useObserveInternal(
            newValue,
            parentSubscription,
            rootObservableCallback,
          ).$value;
        return;
      }
      return target.valueOf();
    }
  );

  return target as unknown as ObservableType<T>;
}
