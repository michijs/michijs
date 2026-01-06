import type { MichiCustomElement } from "../types";

export function getShadowRoot(
  self?: MichiCustomElement | Element,
): ShadowRoot | null | undefined {
  return self
    ? (self.shadowRoot ?? ("$michi" in self ? self.$michi?.shadowRoot : null))
    : null;
}
