import { ElementFactory, LSCustomElement, DOMElementJSXElement } from '../..';
import { ObjectFactory } from './ObjectFactory';

export const DOMElementFactory: ElementFactory = {
  compare(el: Node, jsx: DOMElementJSXElement): boolean {
    return el === jsx.tag;
  },
  create(jsx: DOMElementJSXElement, isSVGParam?: boolean, self?: Element) {
    DOMElementFactory.update(jsx, jsx.tag, isSVGParam, self);
    return jsx.tag;
  },
  update(jsx: DOMElementJSXElement, el: Element, isSVGParam?: boolean, self?: LSCustomElement) {
    const isSVG = isSVGParam || jsx.tag.localName === 'svg';
    ObjectFactory.update(jsx, el, isSVG, self);
  }
};
