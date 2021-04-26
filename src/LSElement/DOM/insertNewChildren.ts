import type { LSCustomElement } from '../types';
import { ElementFactory } from '../classes/ElementFactory';

export function insertNewChildren(self: LSCustomElement | null, parent: ParentNode, jsxElements: JSX.Element[], isSvgParam: boolean = false) {
  const pendingInsertions = new Array<string | Node>();
  jsxElements.forEach(jsxElement => ElementFactory.fromJSXElement(jsxElement, self, isSvgParam, pendingInsertions));
  parent.append(...pendingInsertions);
}
