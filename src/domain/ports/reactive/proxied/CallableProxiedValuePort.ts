import type { ObservableGettersAndSetters, ProxiedValuePort } from "@ports";

export interface CallableProxiedValuePort<RV, SV = RV>
  extends ProxiedValuePort<RV>, ObservableGettersAndSetters<RV, SV> {
}
