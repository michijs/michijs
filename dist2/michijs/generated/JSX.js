/**
 * @typedef {import('./htmlType').HTMLElements} HTMLElementsHTMLType
 * @typedef {import('./htmlType').MathMLElements} MathMLElements
 * @typedef {import('./htmlType').SVGElements} SVGElementsHTMLType
 */

/**
 * @typedef {import('../types').SingleJSXElement} SingleJSXElement
 */

/**
 * @typedef {object} ElementsInterfaceOverride
 * @property {HTMLElementTagNameMap["title"] & SVGElementTagNameMap["title"]} title
 * @property {HTMLElementTagNameMap["style"] & SVGElementTagNameMap["style"]} style
 * @property {HTMLElementTagNameMap["a"] & SVGElementTagNameMap["a"]} a
 * @property {HTMLElementTagNameMap["script"] & SVGElementTagNameMap["script"]} script
 */

/**
 * @typedef {HTMLElementsHTMLType<ElementsInterfaceOverride>} HTMLElements
 */

/**
 * @typedef {SVGElementsHTMLType<ElementsInterfaceOverride>} SVGElements
 */
