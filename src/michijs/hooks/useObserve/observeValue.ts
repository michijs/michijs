import { ProxiedValue } from "../../classes/ProxiedValue";
import { ObserverCallback } from "../../types";

export const observeValue = <T extends unknown>(
  item: T,
  initialObservers?: ObserverCallback<T>[]
) => new ProxiedValue(item, initialObservers);
