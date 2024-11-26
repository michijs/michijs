import type { ProxiedValue } from "../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../types";
import { useObserveInternal } from "../useObserve";
import { createParentSubscription } from "./createParentSubscription";
import { getHandler } from "./getHandler";

export class SharedProxyHandler<T> {
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;
  private $ownSubscription?: ParentSubscription<T>;
  getOwnSubscription(target: ProxiedValue<T>): ParentSubscription<T> {
    return (this.$ownSubscription ??= createParentSubscription(() => target));
  }
  createProxyChild(target: ProxiedValue<T>, newValue): ObservableType<unknown> {
    return useObserveInternal<any>(
      newValue,
      this.getOwnSubscription(target),
      this.rootObservableCallback,
    );
  }
  updateHandlerAndValue(
    target: ProxiedValue<T>,
    unproxifiedNewValue,
    newHandler = getHandler(
      unproxifiedNewValue,
      this.parentSubscription,
      this.rootObservableCallback,
    ),
  ) {
    target.handler = newHandler;
    target.$value =
      target.handler.getInitialValue?.(target, unproxifiedNewValue) ??
      unproxifiedNewValue;
    target.notifyCurrentValue();
    return;
  }

  constructor(
    parentSubscription?: ParentSubscription<any>,
    rootObservableCallback?: () => ObservableType<any>,
  ) {
    this.parentSubscription = parentSubscription;
    this.rootObservableCallback = rootObservableCallback;
  }
}
