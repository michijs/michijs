import { Observable, ObservableValue } from "../types";
import { ProxiedValue } from "./observe/ProxiedValue";


export const computedObserve = <T>(callback: () => T, deps: Observable<any>[]): ObservableValue<T> => {

  const proxiedValue = new ProxiedValue<T>(callback());

  const listener = () => proxiedValue.$value = callback();

  deps.forEach(x => x.subscribe?.(listener));

  return proxiedValue as unknown as ObservableValue<T>;
}