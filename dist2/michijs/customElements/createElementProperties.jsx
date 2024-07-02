/**
 * @typedef {import('../types').MichiElementOptions} MichiElementOptions
 * @typedef {import('../types').MichiElementSelf} MichiElementSelf
 */

/**
 * @template {MichiElementOptions} O
 * @param {O & ThisType<MichiElementSelf<O>>} elementOptions
 * @returns {O}
 */
export function createElementProperties(elementOptions) {
  return elementOptions;
}
