import type { ProxiedValuePort } from "#ports";

export interface ProxyHandlerPort<T>
  extends Required<Pick<ProxyHandler<ProxiedValuePort<T>>, "apply">>,
    Omit<ProxyHandler<ProxiedValuePort<T>>, "apply"> {
  // TODO: Should be observableType
  getInitialValue?(target: ProxiedValuePort<T>, unproxifiedValue: T): any;
  applyNewValue?(target: ProxiedValuePort<T>, unproxifiedValue: T): any;
}
