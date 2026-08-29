import type {
  ObservableProxyPort,
  ProxiedValuePort,
  ObservableGettersAndSetters,
} from "#ports";

export type ObservableProxiedObjectHelper<
  RV,
  SV = {
    [K in keyof RV]-?: ObservableProxyPort<RV[K]>;
  },
> = SV & ProxiedValuePort<RV> & ObservableGettersAndSetters<RV, SV>;

export type ObservableProxiedObject<RV> = ObservableProxiedObjectHelper<RV>;
