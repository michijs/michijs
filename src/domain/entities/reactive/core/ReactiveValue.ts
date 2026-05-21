import { hasToJSON } from "#shared";
import type {
  CallableReactiveValuePort,
  NotifiableObservers,
  ObservableGettersAndSetters,
  ObservablePort,
  ReactiveValuePort,
} from "#ports";
import { CallableObservable } from "./CallableObservable";
import { trackAccess } from "../../../utils/dependencyTracker";

export class ReactiveValue<T>
  extends CallableObservable<T>
  implements ReactiveValuePort<T>
{
  $value: T;
  constructor(
    initialValue: T,
    setterAndGetterFunction: ObservableGettersAndSetters<T, T> = ((
      ...args: [T]
    ): undefined | T => {
      if (args.length > 0) {
        const newValue = args[0];
        if (newValue === this.$value) return;
        this.$value = newValue;
        this.notify(newValue);
        return;
      }
      removeTrackDependencies: {
        trackAccess(this);
      }
      return this.$value;
    }) as unknown as ObservableGettersAndSetters<T, T>,
  ) {
    super(setterAndGetterFunction);
    this.$value = initialValue;
  }
  compute<V>(callback: (value: T) => V): CallableReactiveValuePort<V> {
    const computedValue = new ReactiveValue(callback(this.$value));
    this.subscribe((v) => {
      computedValue(callback(v));
    });
    return computedValue as unknown as CallableReactiveValuePort<V>;
  }
  is(anotherValue: unknown): CallableReactiveValuePort<boolean> {
    const computedValue = this.compute((v) => v === anotherValue?.valueOf());
    (anotherValue as Partial<ObservablePort<unknown>>)?.subscribe?.((v) =>
      computedValue(v === this.$value),
    );

    return computedValue;
  }

  notifyCurrentValue(notifiableObservers?: NotifiableObservers<T>) {
    return this.notify(this.$value, notifiableObservers);
  }

  override valueOf(): T {
    removeTrackDependencies: {
      trackAccess(this);
    }
    return this.$value;
  }

  toJSON(): any {
    if (this.$value && hasToJSON(this.$value)) return this.$value.toJSON();

    return this.$value;
  }

  override toString(): string {
    // @ts-ignore
    return this.valueOf().toString();
  }
}
