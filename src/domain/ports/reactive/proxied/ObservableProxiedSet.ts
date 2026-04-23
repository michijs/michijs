import type { ReadWriteSet } from "@shared";
import type {
  ObservableProxyPort,
  ProxiedValuePort,
  ObservableGettersAndSetters,
} from "@ports";

export interface ObservableProxiedSetHelper<RV, SV = ObservableProxyPort<RV>>
  extends ReadWriteSet<RV, SV>,
    ProxiedValuePort<Set<SV>>,
    ObservableGettersAndSetters<Set<SV>, Set<SV>> {}
export interface ObservableProxiedSet<RV>
  extends ObservableProxiedSetHelper<RV> {}
