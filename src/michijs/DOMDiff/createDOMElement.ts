import { setProperties } from "../DOM/attributes/setProperties";
import { isElement } from "../typeWards/isElement";
import { create } from "./create";
import type { DOMElementJSXElement } from "../types";

export const createDOMElement = (
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs }, jsxTag }: DOMElementJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): ParentNode => {
  if (children)
    if (Array.isArray(children))
      jsxTag.append(
        ...children.map((x) => create(x, contextElement, contextNamespace)),
      );
    else jsxTag.append(create(children, contextElement, contextNamespace));

  if (isElement(jsxTag)) setProperties(jsxTag, attrs, contextElement);
  return jsxTag;
};
