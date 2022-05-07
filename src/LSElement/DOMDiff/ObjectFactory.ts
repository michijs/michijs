import { ElementFactory, LSCustomElement, ObjectJSXElement } from '../..';
import { setAttributes } from '../DOM/attributes/setAttributes';
import { create } from './create';
import { updateChildren } from './updateChildren';

export const ObjectFactory: ElementFactory = {
  compare(el: Element, jsx: ObjectJSXElement): boolean {
    return el.localName === jsx.tag;
  },
  create(jsx: ObjectJSXElement, isSVGParam?: boolean, self?: Element) {
    const isSVG = isSVGParam || jsx.tag === 'svg';
    let el: Element;
    const { children, $staticChildren, $oncreated, $doNotTouchChildren, $onupdate, ...attrs } = jsx.attrs;
    if (isSVG) {
      if (jsx.attrs?.is) {
        el = document.createElementNS('http://www.w3.org/2000/svg', jsx.tag, jsx.attrs.is);
      } else {
        el = document.createElementNS('http://www.w3.org/2000/svg', jsx.tag);
      }
    }
    else if (jsx.attrs?.is) {
      el = document.createElement(jsx.tag, jsx.attrs.is);
    } else {
      el = document.createElement(jsx.tag);
    }
    $oncreated?.(el, isSVG, self);

    if (!el.$doNotTouchChildren && !$doNotTouchChildren)
      el.append(...children.map(x => create(x, isSVG, self)));

    setAttributes(
      el,
      attrs,
      self
    );

    return el;
  },
  update(jsx: ObjectJSXElement, el: Element, isSVGParam?: boolean, self?: LSCustomElement) {
    const isSVG = isSVGParam || jsx.tag === 'svg';
    const { children, $staticChildren, $oncreated, $doNotTouchChildren, $onupdate, ...attrs } = jsx.attrs;
    $onupdate?.(jsx, el, isSVG, self);
    if (!el.$doNotTouchChildren && !$doNotTouchChildren && !$staticChildren)
      updateChildren(el, children, isSVG, self);

    setAttributes(
      el,
      attrs,
      self
    );
  },
};
