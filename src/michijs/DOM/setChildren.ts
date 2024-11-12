import type { SingleJSXElement } from "../types";
import { create } from "./create";

export const setChildren = (jsxTag: ParentNode, children?: SingleJSXElement | SingleJSXElement[], contextElement?: Element, contextNamespace?: string) => {
  if (children)
    if (Array.isArray(children))
      jsxTag.append(
        ...children.map((x) => create(x, contextElement, contextNamespace)),
      );
    else jsxTag.append(create(children, contextElement, contextNamespace));
}