import { setProperties } from "./attributes/setProperties";
import type { DOMElementJSXElement } from "../types";
import { setChildren } from "./setChildren";

export const createDOMElement = (
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs }, jsxTag }: DOMElementJSXElement<Element>,
  contextElement?: Element,
  contextNamespace?: string,
): ParentNode => {
  setChildren(jsxTag, children, contextElement, contextNamespace);

  setProperties(jsxTag, attrs, contextElement);
  return jsxTag;
};
