import type { ArrayJSXElement } from "../../types";
import { updateClone } from "../clone/updateClone";

export const updateCloneChildNodeCallback =
  (jsx: ArrayJSXElement, contextElement?: Element) =>
  (childNode: ChildNode, i: number) =>
    updateClone(childNode, jsx[i], contextElement);
