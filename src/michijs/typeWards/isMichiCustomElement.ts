import { MichiCustomElement } from "../types";

export function isMichiCustomElement(
  param: Element,
): param is MichiCustomElement {
  return "$michi" in param;
}
