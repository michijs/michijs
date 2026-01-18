import type { ProxiedValue } from "../../../domain/entities";
import type { ParentSubscription } from "../../types";

export const createParentSubscription = <T>(
  proxiedValue: ProxiedValue<T>,
): ParentSubscription<T> => {
  const subscription: ParentSubscription<T> = () =>
    proxiedValue.notifyCurrentValue();
  subscription.shouldNotify = () => proxiedValue.notifiableObservers;
  return subscription;
};
