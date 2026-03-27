import type { ReactiveValuePort, ObservableGettersAndSetters } from "@domain";

export interface CallableReactiveValuePort<RV>
  extends ReactiveValuePort<RV>,
    ObservableGettersAndSetters<RV, RV> {}
