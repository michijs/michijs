import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableType, ObservableProxyHandler } from "../../types";
import { useComputedObserve } from "../useComputedObserve";

export class FunctionProxyHandler implements ObservableProxyHandler<ProxiedValueV2<Function>, Function> {
    rootObservableCallback?: () => ObservableType<any>;

    constructor(
        rootObservableCallback?: () => ObservableType<any>,
    ) {
        this.rootObservableCallback = rootObservableCallback;
    }

    apply(target: ProxiedValueV2<Function>, _, args) {
        if (this.rootObservableCallback)
            return useComputedObserve(
                () => target.$value(...args),
                [this.rootObservableCallback()],
            );
        else return target.$value(...args);
        // Functions cant change their type
    }
    get(target, p, receiver) {
      if (p in target) return Reflect.get(target, p, receiver);
      return target.$value[p];
    }
}
