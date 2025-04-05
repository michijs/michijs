import { setProperties } from "../attributes/setProperties";
import { Namespaces } from "../../constants/namespaces";
import type { ObjectJSXElement } from "../../types";
import { setChildren } from "./setChildren";

// This has a lot of performance improvement for some reason
export const createObject = (
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs }, jsxTag }: ObjectJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): Element => {
  const newNamespace =
    Namespaces[jsxTag] ?? contextNamespace ?? Namespaces.HTML;

  const el = document.createElementNS(newNamespace, jsxTag, {
    is: attrs?.is,
  });

  setChildren(el, children, contextElement, newNamespace);

  setProperties(el, attrs, contextElement);

  return el;
};
