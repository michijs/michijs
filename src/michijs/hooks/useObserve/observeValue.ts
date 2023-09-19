import { ProxiedValue } from "../../classes/ProxiedValue";
import { ObserverCallback } from "../../types";

export function observeValue<T extends unknown>(
  item: T,
  initialObservers?: ObserverCallback<T>[]
) { return new ProxiedValue(item, initialObservers) };
