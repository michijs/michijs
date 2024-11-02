import { setProperties } from "../DOM/attributes/setProperties";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";
import type { DOMElementJSXElement } from "../types";

export const createDOMElement = (
  jsx: DOMElementJSXElement,
  contextElement?: Element,
  contextNamespace?: string
): ParentNode => {
  const { children, ...attrs } = jsx.attrs;

  if (children)
    if (Array.isArray(children))
      jsx.jsxTag.append(...children.map((x) => create(x, contextElement, contextNamespace)));
    else jsx.jsxTag.append(create(children, contextElement, contextNamespace));

  if (isElement(jsx.jsxTag)) setProperties(jsx.jsxTag, attrs, contextElement);
  return jsx.jsxTag;
};
