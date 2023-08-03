import { ObservableLike, ObservableValue } from "../types";
import { ProxiedValue } from "../classes/ProxiedValue";

export const computedObserve = <T>(callback: () => T, deps: Partial<ObservableLike<any>>[]): ObservableValue<T> => {

  const proxiedValue = new ProxiedValue<T>(callback());

  const listener = () => proxiedValue.$value = callback();

  deps.forEach(x => x.subscribe?.(listener));

  return proxiedValue as unknown as ObservableValue<T>;
}