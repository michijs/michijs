import type { CallableProxiedValuePort } from "@ports";

export interface ObservableProxiedPrimitivePort<RV> extends CallableProxiedValuePort<RV, RV> { }
