export interface Subscription<T> {
  (signal: T): void;
}
