import type { ObservableType } from "../../types";
import type { ProxiedValue } from "../../classes/ProxiedValue";

export const customMapAndSetClear = (
  target: ProxiedValue<Map<any, any>> | ProxiedValue<Set<any>>,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return () => {
    if (target.shouldNotify()) {
      if (target.$value.size !== 0) {
        clearFn();
        target.notifyCurrentValue();
      }
    } else clearFn();
  };
};

export const customMapAndSetDelete = (
  target: ProxiedValue<Map<any, any>> | ProxiedValue<Set<any>>,
  deleteFn:
    | Map<unknown, ObservableType<unknown>>["delete"]
    | Set<ObservableType<unknown>>["delete"],
):
  | Map<unknown, ObservableType<unknown>>["delete"]
  | Set<ObservableType<unknown>>["delete"] => {
  //In Map is key, in Set is value
  return (key) => {
    const result = deleteFn(key?.valueOf?.());
    if (result) target.notifyCurrentValue();
    return result;
  };
};
