import type { ObservableProxiedPrimitivePort } from "@ports";

export interface ObservableProxiedDatePort
  extends ObservableProxiedPrimitivePort<Date>,
    Omit<Date, "valueOf"> {}
