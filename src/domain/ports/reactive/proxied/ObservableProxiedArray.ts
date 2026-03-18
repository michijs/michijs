import type { ReadWriteArray } from "@shared";
import type { ObservableProxyPort, ObservableGettersAndSetters, ReactiveArrayPort, ProxiedValuePort } from "@ports";

interface ObservableProxiedArrayHelper<RV, SV = ObservableProxyPort<RV>>
  extends ReadWriteArray<RV, SV>, ReactiveArrayPort<RV | SV>, ProxiedValuePort<RV[]>, ObservableGettersAndSetters<RV[], SV[]> {
}

export interface ObservableProxiedArray<RV> extends ObservableProxiedArrayHelper<RV> { }
