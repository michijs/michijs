import type { AnyObject } from "#shared";

export interface ElementFactoryPort<S = unknown, J = unknown> {
  contextElement?: S;
  setProperties(
    el: Element,
    attributes: AnyObject,
    shouldValidateInitialValue?: boolean,
  ): void;
  create<T = Node>(jsx: J): T;
}
