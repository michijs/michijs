import type { MichiCustomElement } from "../types";

export const isMichiCustomElement = (
  param: Element | MichiCustomElement,
): param is MichiCustomElement => !!(param as MichiCustomElement).$michi;
