// Core types used across all layers
export type Subscription<T = any> = (value: T) => void;
export type NotifiableObservers<T> = Set<Subscription<T>> | undefined;

export interface ObservableLike<T> {
  notify(value: T, observers?: NotifiableObservers<T>): void;
  subscribe(observer: Subscription<T>): void;
  unsubscribe(observer: Subscription<T>): void;
}
