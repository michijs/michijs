import type { DOMElementJSXElement, ObjectJSXElement } from "../../types";
import { updateCloneProperties } from "../attributes/updateCloneProperties";
import { forEachChildren } from "../forEachChildren";
import { updateClone } from "./updateClone";
import { updateCloneChildNodeCallback } from "../callbacks/updateCloneChildNodeCallback";


export const updateClonedDomElementOrObjectJSXElement = (
  clonedNode: Element,
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs } }: DOMElementJSXElement<Element> | ObjectJSXElement,
  contextElement?: Element
): void => {
  if (children)
    if (Array.isArray(children))
      forEachChildren(clonedNode.firstChild, updateCloneChildNodeCallback(children, contextElement));

    else
      updateClone(clonedNode.firstChild!, children, contextElement);

  updateCloneProperties(clonedNode, attrs, contextElement);
};
