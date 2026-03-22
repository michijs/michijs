import type { ProxiedValuePort } from "@ports";

export const isProxiedValue = <T>(val: unknown): val is ProxiedValuePort<T> => !!(val as ProxiedValuePort<unknown>)?.$value;
