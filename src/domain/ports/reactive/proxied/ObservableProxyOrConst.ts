import type { CallableReactiveValuePort, ObservableProxyPort } from "@ports";

export type ObservableProxyOrConst<T> =
  | CallableReactiveValuePort<T>
  | ObservableProxyPort<T>
  | T;
