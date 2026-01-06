import "../../types";
import "../../classes/ProxiedValue";

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
