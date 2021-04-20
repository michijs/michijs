import type { LSCustomElement } from '../types';
import { ElementFactory } from '../classes/ElementFactory';

export function insertNewChildren(self: LSCustomElement | null, parent: ParentNode, jsxElements: JSX.Element[], isSvgParam: boolean = false) {
  const createdElements = jsxElements.map(jsxElement => ElementFactory.fromJSXElement(self, jsxElement, isSvgParam));
  parent.append(...createdElements);
}
