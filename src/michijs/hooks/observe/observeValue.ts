import { ProxiedValue } from "./ProxiedValue";

export const observeValue = <T extends unknown>(item: T) => {
  return new ProxiedValue(item);
};
