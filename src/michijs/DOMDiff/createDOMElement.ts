import { setProperties } from "../DOM/attributes/setProperties";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";
import { CreateOptions, DOMElementJSXElement } from "../types";

export const createDOMElement = (
  jsx: DOMElementJSXElement,
  options: CreateOptions,
) => {
  const { children, ...attrs } = jsx.attrs;

  if (children)
    if (Array.isArray(children))
      jsx.jsxTag.append(...children.map((x) => create(x, options)));
    else jsx.jsxTag.append(create(children, options));

  if (isElement(jsx.jsxTag)) setProperties(jsx.jsxTag, attrs, options);
  return jsx.jsxTag;
};
