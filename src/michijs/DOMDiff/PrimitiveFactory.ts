import { ElementFactory, NonNullablePrimitiveType } from "../..";

export const PrimitiveFactory: Required<ElementFactory> = {
  compare(el: Element): boolean {
    return el.nodeType === 3;
  },
  create(jsx: NonNullablePrimitiveType) {
    return document.createTextNode(jsx.toString());
  },
  update(jsx: NonNullablePrimitiveType, el: Element) {
    if (el.textContent !== jsx.toString()) el.textContent = jsx.toString();
  },
};
