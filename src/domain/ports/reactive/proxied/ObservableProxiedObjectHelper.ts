import type { CallableProxiedValuePort, ObservableProxyPort } from "@ports";

export type ObservableProxiedObjectHelper<
  RV,
  SV = {
    [K in keyof RV]-?: ObservableProxyPort<RV[K]>;
  },
> = SV & CallableProxiedValuePort<RV, SV>;

export type ObservableProxiedObject<RV> = ObservableProxiedObjectHelper<RV>;
