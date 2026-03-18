import type { ReactiveValuePort, ProxyHandlerPort } from "@domain";
import type { Typeof } from "@shared";


export interface ProxiedValuePort<RV> extends ReactiveValuePort<RV> {
  handler: ProxyHandlerPort<RV>;
  typeof(): Typeof;
  unproxify(): RV;
}
