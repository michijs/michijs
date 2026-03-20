import type { ProxiedValuePort } from "@ports";

export const isProxiedValue = <T>(val: unknown): val is ProxiedValuePort<T> =>
  val != null && typeof val === "object" && "$value" in val;
