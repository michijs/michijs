import type {
  ProxiedValuePort,
  ObservableProxyPort,
  ProxyHandlerPort,
} from "#ports";
import { useComputedObserve } from "../hooks/useComputedObserve";

export class FunctionProxyHandler implements ProxyHandlerPort<Function> {
  rootObservableCallback?: () => ObservableProxyPort<any>;

  constructor(rootObservableCallback?: () => ObservableProxyPort<any>) {
    this.rootObservableCallback = rootObservableCallback;
  }

  apply(target: ProxiedValuePort<Function>, _, args) {
    // Functions cant change their type - another function was set
    if (args.length === 1 && typeof args[0] === "function") {
      target.$value = args[0];
      return;
    }

    if (this.rootObservableCallback)
      return useComputedObserve(() => target.$value(...args), {
        deps: [this.rootObservableCallback()],
      });
    return target.$value(...args);
  }
  get(target: ProxiedValuePort<Function>, p: string | symbol, receiver) {
    if (p in target) return Reflect.get(target, p, receiver);
    return target.$value[p];
  }
}
