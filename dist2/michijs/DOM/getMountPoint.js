import { getShadowRoot } from "../utils/getShadowRoot";

/**
 * @typedef {import('../types').MichiCustomElement} MichiCustomElement
 */

/**
 * @param {MichiCustomElement} self
 * @returns {ShadowRoot | MichiCustomElement}
 */
export function getMountPoint(self) {
    return getShadowRoot(self) ?? self;
}
