import { ProxiedValue } from "./ProxiedValue";

export const observeValue = <T extends unknown>(item: T) => new ProxiedValue(item);
