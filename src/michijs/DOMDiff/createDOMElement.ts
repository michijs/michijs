import { setProperties } from "../DOM/attributes/setProperties";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";
import { CreateOptions, DOMElementJSXElement } from "../types";

export const createDOMElement = (
  jsx: DOMElementJSXElement,
  options: CreateOptions,
) => {
  const { children, ...attrs } = jsx.attrs;

  jsx.jsxTag.append(...children.map((x) => create(x, options)));

  if (isElement(jsx.jsxTag)) setProperties(jsx.jsxTag, attrs, options);
  return jsx.jsxTag;
};
