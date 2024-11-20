import type { ProxiedValue } from "@michijs/michijs/michijs/classes";
import type { ParentSubscription } from "@michijs/michijs/michijs/types";

export const createParentSubscription = <T>(
  proxiedValue: () => ProxiedValue<T>,
): ParentSubscription<T> => {
  const subscription: ParentSubscription<T> = () =>
    proxiedValue().notifyCurrentValue();
  subscription.shouldNotify = () => proxiedValue().notifiableObservers;
  return subscription;
};
