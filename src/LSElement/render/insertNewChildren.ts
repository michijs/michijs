import { ElementMapChild, LSCustomElement } from '../types';
import { createElement } from './createElement';

export function insertNewChildren(self: LSCustomElement, parent: ParentNode, children: ElementMapChild[], isSvgParam: boolean = false) {
  const createdElements = children.map(childElementMap => createElement(self, childElementMap, isSvgParam));
  parent.append(...createdElements);
}
