import { ElementMapChild } from '../types';
import { createElement } from './createElement';

export function insertNewChildren(parent: ParentNode, children: ElementMapChild[], isSvgParam: boolean = false) {
  const createdElements = children.map(childElementMap => createElement(childElementMap, isSvgParam));
  parent.append(...createdElements);
}
