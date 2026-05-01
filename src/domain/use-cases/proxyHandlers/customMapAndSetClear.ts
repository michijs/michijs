import type { ProxiedValuePort } from "#ports";

export const customMapAndSetClear = (
  target: ProxiedValuePort<Map<any, any>> | ProxiedValuePort<Set<any>>,
  clearFn: Map<any, any>["clear"] | Set<any>["clear"],
): Map<any, any>["clear"] | Set<any>["clear"] => {
  return () => {
    if (target.$value.size !== 0) {
      clearFn();
      target.notifyCurrentValue();
    }
  };
};
