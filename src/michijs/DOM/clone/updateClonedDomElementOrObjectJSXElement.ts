import type { DOMElementJSXElement, ObjectJSXElement } from "../../types";
import { forEachChildren } from "../forEachChildren";
import { updateClone } from "./updateClone";
import { updateCloneChildNodeCallback } from "../callbacks/updateCloneChildNodeCallback";
import { setProperties } from "../attributes/setProperties";

export const updateClonedDomElementOrObjectJSXElement = (
  clonedNode: Element,
  // This has a lot of performance improvement for some reason
  {
    attrs: { children, ...attrs },
  }: DOMElementJSXElement<Element> | ObjectJSXElement,
  contextElement?: Element,
): void => {
  if (children)
    if (Array.isArray(children))
      forEachChildren(
        clonedNode.firstChild,
        updateCloneChildNodeCallback(children, contextElement),
      );
    else updateClone(clonedNode.firstChild!, children, contextElement);

  setProperties(clonedNode, attrs, contextElement, true);
};
