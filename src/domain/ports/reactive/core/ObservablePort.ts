import type { NotifiableObservers, Subscription } from "@ports";

export interface ObservablePort<T> {
  subscribe(observer: Subscription<T>): void;
  notify(value: T, observers: NotifiableObservers<T>): void;
  unsubscribe(observer: Subscription<T>): void;
}
