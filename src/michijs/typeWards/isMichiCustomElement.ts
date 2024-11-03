import type { MichiCustomElement } from "../types";

export function isMichiCustomElement(
  param: Element,
): param is MichiCustomElement {
  // @ts-ignore
  return !!param.$michi;
}
