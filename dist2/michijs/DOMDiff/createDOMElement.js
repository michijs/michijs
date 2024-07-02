import { setProperties } from "../DOM/attributes/setProperties";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').DOMElementJSXElement} DOMElementJSXElement
 */

/**
 * @param {DOMElementJSXElement} jsx
 * @param {CreateOptions} options
 * @returns {ParentNode}
 */
export const createDOMElement = (jsx, options) => {
  const { children, ...attrs } = jsx.attrs;

  if (children)
    if (Array.isArray(children))
      jsx.jsxTag.append(...children.map((x) => create(x, options)));
    else jsx.jsxTag.append(create(children, options));

  if (isElement(jsx.jsxTag)) setProperties(jsx.jsxTag, attrs, options);
  return jsx.jsxTag;
};
