import { LSCustomElement, ObjectJSXElement } from '../..';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { setAttributes } from '../DOM/attributes/setAttributes';
import { LSParentNode } from './LSParentNode';
import { LSNodeEvents } from '../types';

export class LSObjectNode extends LSParentNode<ObjectJSXElement> {
  events: LSNodeEvents = {};
  isSVGParam: boolean;

  constructor(jsxElement: ObjectJSXElement, isSVGParam: boolean, self: LSCustomElement) {
    super(jsxElement, isSVGParam || (jsxElement.tag && jsxElement.tag.toLowerCase() === 'svg'), self);
    this.isSVGParam = isSVGParam;
    if (this.isSVG) {
      if (jsxElement.attrs?.is) {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', jsxElement.tag, jsxElement.attrs.is);
      } else {
        this.el = document.createElementNS('http://www.w3.org/2000/svg', jsxElement.tag);
      }
    }
    else if (jsxElement.attrs?.is) {
      this.el = document.createElement(jsxElement.tag, jsxElement.attrs.is);
    } else {
      this.el = document.createElement(jsxElement.tag);
    }
    setAttributes({
      target: this.el as Element,
      newAttributes: jsxElement.attrs,
      events: this.events,
      self
    });

    this.createAndAppend(jsxElement.attrs.children);
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.OBJECT && typedNewJSXElement<ObjectJSXElement>().tag === this.jsxElement.tag && typedNewJSXElement<ObjectJSXElement>().attrs.children.length === this.jsxElement.attrs.children.length) {
      setAttributes({
        target: this.el as Element,
        newAttributes: typedNewJSXElement<ObjectJSXElement>().attrs,
        oldAttributes: this.jsxElement.attrs,
        events: this.events,
        self: this.self
      });
      // They must always be the same number of children for the node
      this.childrenNodes = this.childrenNodes.map((childNode, i) => childNode.updateElement(typedNewJSXElement<ObjectJSXElement>().attrs.children[i]));
      this.jsxElement.attrs = typedNewJSXElement<ObjectJSXElement>().attrs;
      return this;
    }
    // intentional isSVGParam
    return this.replaceWith(newJSXElement, this.isSVGParam);
  }
}