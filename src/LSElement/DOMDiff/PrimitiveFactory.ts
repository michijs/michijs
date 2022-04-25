import { ElementFactory, PrimitiveType } from '../..';

export const PrimitiveFactory: ElementFactory = {
  compare(el: Element): boolean {
    return el.nodeType === 3;
  },
  create(jsx: PrimitiveType) {
    return document.createTextNode(jsx.toString());
  },
  update(jsx: PrimitiveType, el: Element) {
    if (el.textContent !== jsx.toString())
      el.textContent = jsx.toString();
  }
};
