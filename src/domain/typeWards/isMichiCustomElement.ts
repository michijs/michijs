import type { MichiCustomElement } from "../../michijs/types";

export const isMichiCustomElement = (
  param: Element | MichiCustomElement,
): param is MichiCustomElement => !!(param as MichiCustomElement).$michi;
