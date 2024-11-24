import { ProxiedValueV2 } from "../../classes/ProxiedValue";
import type { ObservableType, ParentSubscription } from "../../types";
import { createParentSubscription } from "./createParentSubscription";

export class SharedProxyHandler<T> {
  parentSubscription?: ParentSubscription<any>;
  rootObservableCallback?: () => ObservableType<any>;
  private $ownSubscription?: ParentSubscription<T>;
  getOwnSubscription(target: ProxiedValueV2<T>): ParentSubscription<T> {
    return this.$ownSubscription ??= createParentSubscription(() => target);
  }

  constructor(
    parentSubscription?: ParentSubscription<any>, rootObservableCallback?: () => ObservableType<any>
  ) {
    this.parentSubscription = parentSubscription;
    this.rootObservableCallback = rootObservableCallback;
  }
}
