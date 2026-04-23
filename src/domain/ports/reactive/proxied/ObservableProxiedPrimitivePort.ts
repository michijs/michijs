import type { ProxiedValuePort, ObservableGettersAndSetters } from "@ports";

export interface ObservableProxiedPrimitivePort<RV>
  extends ProxiedValuePort<RV>,
    ObservableGettersAndSetters<RV, RV> {}
