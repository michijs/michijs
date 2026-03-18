import type { ReadWriteSet } from "@shared";
import type { ObservableProxyPort, CallableProxiedValuePort } from "@ports";

export interface ObservableProxiedSetHelper<RV, SV = ObservableProxyPort<RV>>
  extends ReadWriteSet<RV, SV>, CallableProxiedValuePort<Set<SV>, Set<SV>> {
}
export interface ObservableProxiedSet<RV> extends ObservableProxiedSetHelper<RV> { }
