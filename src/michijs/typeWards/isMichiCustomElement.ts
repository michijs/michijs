import type { MichiCustomElement } from "../types";

export function isMichiCustomElement(
  param: Element | MichiCustomElement,
): param is MichiCustomElement {
  return !!(param as MichiCustomElement).$michi;
}
