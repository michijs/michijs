import { ElementFactory, PrimitiveType } from '../..';

export class PrimitiveFactory implements ElementFactory {
    jsx: PrimitiveType;
    constructor(jsx: PrimitiveType) {
      this.jsx = jsx;
    }
    compare(el: Element): boolean {
      return el.nodeType === 3;
    }
    create() {
      return document.createTextNode(this.jsx.toString());
    }
    update(el: Element) {
      if (el.textContent !== this.jsx.toString())
        el.textContent = this.jsx.toString();
    }
}
