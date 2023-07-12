import { Observable } from "../../types";
import { ProxiedValue } from "./ProxiedValue";

export const customMapAndSetClear = (
  target: ProxiedValue<
    Map<unknown, Observable<unknown>> | Set<Observable<unknown>>
  >,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return function () {
    if (target.shouldCheckForChanges()) {
      if (target.$value.size !== 0) {
        clearFn();
        target.notify();
      }
    } else {
      clearFn();
      //TODO: Should send each index?
      target.notify();
    }
  };
};

export const customMapAndSetDelete = (
  target: ProxiedValue<
    Map<unknown, Observable<unknown>> | Set<Observable<unknown>>
  >,
  deleteFn:
    | Map<unknown, Observable<unknown>>["delete"]
    | Set<Observable<unknown>>["delete"],
):
  | Map<unknown, Observable<unknown>>["delete"]
  | Set<Observable<unknown>>["delete"] => {
  //In Map is key, in Set is value
  return function (key) {
    const result = deleteFn(key);
    if (result) target.notify();
    //TODO: ?
    return result;
  };
};
