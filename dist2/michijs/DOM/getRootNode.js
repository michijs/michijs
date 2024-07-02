import { getShadowRoot } from "../utils/getShadowRoot";

/**
 * @typedef {import('../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {MichiCustomElement} self
 * @returns {Document | ShadowRoot}
 */
export function getRootNode(self) {
  return getShadowRoot(self) ?? self.getRootNode();
}
