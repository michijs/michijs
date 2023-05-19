import { ObservableLike, ObserverCallback } from "../types";

type OnSubscribe = (length: number) => void;
export function observable<T = unknown>(
  onUnsubscribe?: OnSubscribe,
  onSuscribe?: OnSubscribe,
) {
  const observers = new Set<ObserverCallback<T>>();

  const notify = (value: T) => {
    observers.forEach((observer) => {
      observer(value);
    });
  };

  const subscribe: ObservableLike<T>["subscribe"] = (observer): void => {
    observers.add(observer);
    onSuscribe?.(observers.size);
  };

  const unsubscribe = (oldObserver: ObserverCallback<T>): void => {
    observers.delete(oldObserver);
    onUnsubscribe?.(observers.size);
  };
  return { notify, subscribe, unsubscribe };
}
