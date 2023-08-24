import { ObservableLike } from "../types";
import { ProxiedValue } from "../classes/ProxiedValue";

export const usePureFunction = <T>(
  callback: () => T,
  deps: Partial<ObservableLike<any>>[],
): () => ProxiedValue<T> => {
  const proxiedValue = new ProxiedValue<T>();
  let outdated = true;

  const listener = () => (outdated = true);

  deps.forEach((x) => x.subscribe?.(listener));

  return () => {
    if (outdated) {
      outdated = false;
      proxiedValue.$value = callback();
    }
    return proxiedValue;
  };
};
