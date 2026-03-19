import type { ObservableProxyPort, ParentSubscription, ProxiedValuePort } from "@ports";
import { useObserveInternal } from "../hooks/useObserve";
import { createParentSubscription } from "./createParentSubscription";
import { getHandler } from "./getHandler";

export abstract class SharedProxyHandler<T> {
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableProxyPort<any>;
  private $ownSubscription?: ParentSubscription<T>;
  getOwnSubscription(target: ProxiedValuePort<T>): ParentSubscription<T> {
    return (this.$ownSubscription ??= createParentSubscription(target));
  }
  createProxyChild(target: ProxiedValuePort<T>, newValue): ObservableProxyPort<unknown> {
    return useObserveInternal<any>(
      newValue,
      this.getOwnSubscription(target),
      this.rootObservableCallback,
    );
  }
  updateHandlerAndValue(
    target: ProxiedValuePort<T>,
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
    rootObservableCallback?: () => ObservableProxyPort<any>,
  ) {
    this.parentSubscription = parentSubscription;
    this.rootObservableCallback = rootObservableCallback;
  }
}
