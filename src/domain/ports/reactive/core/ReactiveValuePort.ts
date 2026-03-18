import type { Subscription, ObservablePort } from "@domain";


export type NotifiableObservers<T> = Set<Subscription<T>> | undefined;

export interface ReactiveValuePort<RV> extends ObservablePort<RV> {
  $value: RV;
  notifyCurrentValue(notifiableObservers?: NotifiableObservers<RV>): void;
  valueOf(): RV;
  toString(): string;
}
