import { ElementFactory, LSCustomElement, ObjectJSXElement } from '../..';
import { getShadowRoot } from '../utils/getShadowRoot';
import { isCustomElement } from '../utils/isCustomElement';
import { setAttributes } from '../DOM/attributes/setAttributes';
import { getElementFactory, update } from './update';

export class ObjectFactory implements ElementFactory {
  jsx: ObjectJSXElement;
  constructor(jsx: ObjectJSXElement) {
    this.jsx = jsx;
  }
  compare(el: Element): boolean {
    return el.localName === this.jsx.tag;
  }
  create(isSVGParam?: boolean, self?: Element) {
    const isSVG = isSVGParam || this.jsx.tag === 'svg';
    let el: Element;
    const { children, staticChildren, oncreated, ...attrs } = this.jsx.attrs;
    if (isSVG) {
      if (this.jsx.attrs?.is) {
        el = document.createElementNS('http://www.w3.org/2000/svg', this.jsx.tag, this.jsx.attrs.is);
      } else {
        el = document.createElementNS('http://www.w3.org/2000/svg', this.jsx.tag);
      }
    }
    else if (this.jsx.attrs?.is) {
      el = document.createElement(this.jsx.tag, this.jsx.attrs.is);
    } else {
      el = document.createElement(this.jsx.tag);
    }
    oncreated?.(el);

    if (!isCustomElement(this.jsx.tag, this.jsx.attrs.is) || getShadowRoot(el))
      el.append(...children.map(x => getElementFactory(x, self).create(isSVG, self)));

    setAttributes(
      el,
      attrs,
      self
    );

    return el;
  }
  update(el: Element, isSVGParam?: boolean, self?: LSCustomElement) {
    const isSVG = isSVGParam || this.jsx.tag === 'svg';
    const { children, staticChildren, oncreated, ...attrs } = this.jsx.attrs;
    if (!staticChildren && !isCustomElement(this.jsx.tag, this.jsx.attrs.is) || getShadowRoot(el))
      ObjectFactory.updateChildren(el, children, isSVG, self);

    setAttributes(
      el,
      attrs,
      self
    );
  }
  // Intentionally separated for render method
  static async updateChildren(el: ParentNode, children: JSX.Element[], isSVG?: boolean, self?: LSCustomElement) {
    // TODO: when using a custom element wihout shadow root?
    let currentNode = el.firstChild;
    let i = 0;
    while (currentNode) {
      const nextSibling = currentNode.nextSibling;
      if (i < children.length) {
        const x = children[i];
        update(currentNode, x, isSVG, self);
      } else
        currentNode.remove();
      currentNode = nextSibling;
      i++;
    }
    el.append(...children.slice(i).map(x => getElementFactory(x, self).create(isSVG, self)));
  }
}
