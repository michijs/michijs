/**
 * @typedef {import('../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {MichiCustomElement | Element} [self]
 * @returns {ShadowRoot | null | undefined}
 */
export function getShadowRoot(self) {
  return self
    ? self.shadowRoot ?? ("$michi" in self ? self.$michi?.shadowRoot : null)
    : null;
}
