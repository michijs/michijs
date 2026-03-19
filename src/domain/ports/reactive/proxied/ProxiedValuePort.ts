import type { ReactiveValuePort, ProxyHandlerPort, NotifiableObservers } from "@domain";
import type { Typeof } from "@shared";


export interface ProxiedValuePort<RV> extends ReactiveValuePort<RV> {
  handler: ProxyHandlerPort<RV>;
  typeof(): Typeof;
  unproxify(): RV;
  startTransaction(): void;
  endTransaction(): void;
  readonly notifiableObservers: NotifiableObservers<RV>
}
