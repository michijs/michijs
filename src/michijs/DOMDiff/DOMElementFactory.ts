import {
  ElementFactory,
  MichiCustomElement,
  DOMElementJSXElement,
} from '../..';
import { ObjectFactory } from './ObjectFactory';

export const DOMElementFactory: Required<ElementFactory> = {
  compare(el: Node, jsx: DOMElementJSXElement): boolean {
    return el === jsx.tag;
  },
  create(
    jsx: DOMElementJSXElement,
    isSVG?: boolean,
    isMATHML?: boolean,
    self?: Element,
  ) {
    DOMElementFactory.update(jsx, jsx.tag, isSVG, isMATHML, self);
    return jsx.tag;
  },
  update(
    jsx: DOMElementJSXElement,
    el: Element,
    isSVGParam?: boolean,
    isMATHMLParam?: boolean,
    self?: MichiCustomElement,
  ) {
    const isSVG = isSVGParam || jsx.tag.localName === 'svg';
    const isMATHML = !isSVG && (isMATHMLParam || jsx.tag.localName === 'math');
    ObjectFactory.update(jsx, el, isSVG, isMATHML, self);
  },
};
