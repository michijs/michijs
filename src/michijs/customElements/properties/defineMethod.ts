import type { MichiCustomElement } from "../../types";

export function defineMethod(
  self: MichiCustomElement,
  propertyKey: string,
  method: Function,
): void {
  const bindedFunction = method.bind(self);
  Object.defineProperty(self, propertyKey, {
    get() {
      return bindedFunction;
    },
  });
}
