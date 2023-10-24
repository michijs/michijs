import { ProxiedValue } from "../../classes/ProxiedValue";
import { Subscription } from "../../types";

export function observeValue<T extends unknown>(
  item?: T,
  initialObservers?: Subscription<T>[],
) {
  return new ProxiedValue(item, initialObservers);
}
