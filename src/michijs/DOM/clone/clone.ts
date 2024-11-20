import type { SingleJSXElement } from "../../types";
import { updateClone } from "./updateClone";

export const clone = <T = Node>(
  template: Node,
  jsx: SingleJSXElement,
  contextElement?: Element,
): T => {
  const clonedNode = template.cloneNode(true);
  updateClone(clonedNode, jsx, contextElement);
  return clonedNode as T;
};
