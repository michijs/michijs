import "../../classes/ProxiedValue";

export const customMapAndSetClear = (
  target: ProxiedValue<Map<any, any>> | ProxiedValue<Set<any>>,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return () => {
    if (target.$value.size !== 0) {
      clearFn();
      target.notifyCurrentValue();
    }
  };
};
