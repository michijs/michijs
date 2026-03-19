import type { ParentSubscription, ProxiedValuePort } from "@ports";

export const createParentSubscription = <T>(
  proxiedValue: ProxiedValuePort<T>,
): ParentSubscription<T> => {
  const subscription: ParentSubscription<T> = () =>
    proxiedValue.notifyCurrentValue();
  subscription.shouldNotify = () => proxiedValue.notifiableObservers;
  return subscription;
};
