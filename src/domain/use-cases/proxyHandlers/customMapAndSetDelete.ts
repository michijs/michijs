import type { ObservableProxyPort, ProxiedValuePort } from "#ports";

export const customMapAndSetDelete = (
  target: ProxiedValuePort<Map<any, any>> | ProxiedValuePort<Set<any>>,
  deleteFn:
    | Map<unknown, ObservableProxyPort<unknown>>["delete"]
    | Set<ObservableProxyPort<unknown>>["delete"],
):
  | Map<unknown, ObservableProxyPort<unknown>>["delete"]
  | Set<ObservableProxyPort<unknown>>["delete"] => {
  //In Map is key, in Set is value
  return (key) => {
    const result = deleteFn(key?.valueOf?.());
    if (result) target.notifyCurrentValue();
    return result;
  };
};
