import type {
  Subscription,
  NotifiableObservers,
  ObservableLike,
} from "../shared/types/core";
import { GarbageCollectedEvent } from "./GarbageCollectedEvent";

export class Observable<T> implements ObservableLike<T> {
  observers: Set<Subscription<T>> = new Set();

  notify(value: T, observers: NotifiableObservers<T> = this.observers): void {
    for (const observer of observers)
      try {
        observer(value);
      } catch (e) {
        removeObservablesGarbageCollection: {
          if (e instanceof GarbageCollectedEvent) {
            this.unsubscribe(observer);
            continue;
          }
          throw e;
        }
        // @ts-ignore
        throw e;
      }
  }

  subscribe(observer: Subscription<T>): void {
    this.observers.add(observer);
  }

  unsubscribe(oldObserver: Subscription<T>): void {
    this.observers.delete(oldObserver);
  }
}
