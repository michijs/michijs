import { LSCustomElement } from '../../..';
import { EmptyType } from '../../types';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSChildNode } from './LSChildNode';

export class LSEmptyNode extends LSChildNode<EmptyType> {
  constructor(jsxElement: EmptyType, isSVGParam: boolean, self: LSCustomElement) {
    super(jsxElement, isSVGParam, self);
    this.el = document.createComment('');
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type] = getJSXElementType(newJSXElement);
    if (type !== JSXElementType.EMPTY) {
      return this.replaceWith(newJSXElement);
    } 
    return this;
  }
}