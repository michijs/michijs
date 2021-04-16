import { LSCustomElement } from '../types';
import { ElementFactory } from './ElementFactory';

export function insertNewChildren(self: LSCustomElement | DocumentFragment, parent: ParentNode, jsxElements: JSX.Element[], isSvgParam: boolean = false) {
  const createdElements = jsxElements.map(jsxElement => ElementFactory.fromJSXElement(self, jsxElement, isSvgParam));
  parent.append(...createdElements);
}
