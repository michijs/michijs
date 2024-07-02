import { createCustomElement } from "./createCustomElement";

/**
 * @typedef {import('../types').CustomElementTag} CustomElementTag
 * @typedef {import('../types').MichiElementClass} MichiElementClass
 * @typedef {import('../types').MichiElementOptions} MichiElementOptions
 * @typedef {import('../types').MichiElementSelf} MichiElementSelf
 * @typedef {import('../types').NoExtraProperties} NoExtraProperties
 */

/**
 * @param {TemplateStringsArray} tag
 * @returns {<O extends MichiElementOptions, S extends HTMLElement = MichiElementSelf<O>>(elementOptions: any) => MichiElementClass<O, S>}
 */
export function customElement(tag) {
  return (elementOptions) => createCustomElement(tag[0], elementOptions);
}
