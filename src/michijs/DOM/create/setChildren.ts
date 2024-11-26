import type { SingleJSXElement } from "../../types";
import { create } from "./create";

const appendChildCallback =
  (node: ParentNode, contextElement?: Element, contextNamespace?: string) =>
    (x: SingleJSXElement) =>
      node.appendChild(create(x, contextElement, contextNamespace));

export const setChildren = (
  node: ParentNode,
  children?: SingleJSXElement | SingleJSXElement[],
  contextElement?: Element,
  contextNamespace?: string,
) => {
  if (children) {
    const callback = appendChildCallback(
      node,
      contextElement,
      contextNamespace,
    );
    if (Array.isArray(children)) for (const x of children) callback(x);
    else callback(children);
  }
};
