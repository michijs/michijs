import "../../classes";
import "../../types";

export const createParentSubscription = <T>(
  proxiedValue: ProxiedValue<T>,
): ParentSubscription<T> => {
  const subscription: ParentSubscription<T> = () =>
    proxiedValue.notifyCurrentValue();
  subscription.shouldNotify = () => proxiedValue.notifiableObservers;
  return subscription;
};
