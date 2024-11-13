import type { DOMElementJSXElement } from "../../types";
import { setChildren } from "./setChildren";

export const createDOMFragment = (
  // This has a lot of performance improvement for some reason
  children: DOMElementJSXElement<ParentNode>["attrs"]["children"],
  contextElement?: Element,
  contextNamespace?: string,
): ParentNode => {
  const jsxTag = document.createDocumentFragment();
  setChildren(jsxTag, children, contextElement, contextNamespace);
  return jsxTag;
};
