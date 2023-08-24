import { ObservableType } from "../../types";
import { ProxiedValue } from "../../classes/ProxiedValue";

export const customMapAndSetClear = (
  target: ProxiedValue<
    Map<unknown, ObservableType<unknown>> | Set<ObservableType<unknown>>
  >,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return function () {
    if (target.shouldCheckForChanges()) {
      if (target.$value.size !== 0) {
        clearFn();
        target.notify(target.$value);
      }
    } else {
      clearFn();
      //TODO: Should send each index?
      target.notify(target.$value);
    }
  };
};

export const customMapAndSetDelete = (
  target: ProxiedValue<
    Map<unknown, ObservableType<unknown>> | Set<ObservableType<unknown>>
  >,
  deleteFn:
    | Map<unknown, ObservableType<unknown>>["delete"]
    | Set<ObservableType<unknown>>["delete"],
):
  | Map<unknown, ObservableType<unknown>>["delete"]
  | Set<ObservableType<unknown>>["delete"] => {
  //In Map is key, in Set is value
  return function (key) {
    const result = deleteFn(key);
    if (result) target.notify(target.$value);
    //TODO: ?
    return result;
  };
};
