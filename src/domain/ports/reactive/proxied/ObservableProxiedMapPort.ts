import type { ReadWriteMap } from "#shared";
import type {
  ObservableProxyPort,
  ProxiedValuePort,
  ObservableGettersAndSetters,
} from "#ports";

// TODO: we dont support common interfaces yet

export interface ObservableProxiedMapHelper<K, RV, SV = ObservableProxyPort<RV>>
  extends ReadWriteMap<K, RV, SV>,
    ProxiedValuePort<Map<K, SV>>,
    ObservableGettersAndSetters<Map<K, SV>, Map<K, SV>> {}
export interface ObservableProxiedMapPort<K, RV>
  extends ObservableProxiedMapHelper<K, RV> {}
