import { ElementFactory, NonNullablePrimitiveType } from "../..";

export const PrimitiveFactory: Required<ElementFactory> = {
  compare(el: Element): boolean {
    return el.nodeType === 3;
  },
  create(jsx: NonNullablePrimitiveType) {
    const textNode = document.createTextNode(jsx.toString());
    if (jsx.subscribe) {
      jsx.subscribe((newValue) => {
        textNode.textContent = newValue?.toString() ?? "";
      });
    }
    return textNode;
  },
};
