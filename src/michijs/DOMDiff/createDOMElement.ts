import { setAttributes } from "../DOM/attributes/setAttributes";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";
import { CreateOptions, DOMElementJSXElement } from "../types";

export const createDOMElement = (jsx: DOMElementJSXElement, options: CreateOptions) => {
  const {
    children,
    ...attrs
  } = jsx.attrs;

  jsx.tag.append(...children.map((x) => create(x, options)));

  if (isElement(jsx.tag))
    setAttributes(jsx.tag, attrs, options);
  return jsx.tag;
}