import { LSCustomElement } from '../..';
import { PrimitiveType } from '../types';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { LSChildNode } from './LSChildNode';

export class LSPrimitiveNode extends LSChildNode<PrimitiveType> {
  constructor(jsxElement: PrimitiveType, isSVGParam: boolean, self: LSCustomElement) {
    super(jsxElement, isSVGParam, self);
    this.el = document.createTextNode(jsxElement.toString());
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.PRIMITIVE) {
      if (this.jsxElement !== newJSXElement) {
        this.el.textContent = typedNewJSXElement<PrimitiveType>().toString();
        this.jsxElement = typedNewJSXElement<PrimitiveType>();
      }
      return this;
    }
    return this.replaceWith(newJSXElement);
  }
}