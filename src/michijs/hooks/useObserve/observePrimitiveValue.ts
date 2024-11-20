import type { ObservableType, ParentSubscription } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";
// import { setObservableValue } from "../../utils/setObservableValue";

/**
 * **Warning** Still WIP - do not use in production
 */
export function observePrimitiveValue<T>(
  item: T,
  parentSubscription?: ParentSubscription<any>,
  // rootObservableCallback?: () => ObservableType<any>,
): ObservableType<T> {
  const target = new ProxiedValue(item, parentSubscription, (...args) => {
    if (args.length > 0) {
      const newValue = args[0];
      target.$privateValue = newValue;
      target.notifyCurrentValue();
      // setObservableValue(
      //   target,
      //   newValue,
      //   parentSubscription as ParentSubscription<any>,
      //   rootObservableCallback,
      // );
      return;
    }
    return target.valueOf();
  });

  return target as unknown as ObservableType<T>;
}
