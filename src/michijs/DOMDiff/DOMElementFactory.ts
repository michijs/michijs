import { ElementFactory, MichiCustomElement, DOMElementJSXElement } from '../..';
import { ObjectFactory } from './ObjectFactory';

export const DOMElementFactory: Required<ElementFactory> = {
  compare(el: Node, jsx: DOMElementJSXElement): boolean {
    return el === jsx.tag;
  },
  create(jsx: DOMElementJSXElement, isSVGParam?: boolean, self?: Element) {
    DOMElementFactory.update(jsx, jsx.tag, isSVGParam, self);
    return jsx.tag;
  },
  update(jsx: DOMElementJSXElement, el: Element, isSVGParam?: boolean, self?: MichiCustomElement) {
    const isSVG = isSVGParam || jsx.tag.localName === 'svg';
    ObjectFactory.update(jsx, el, isSVG, self);
  }
};
