import { ElementMapChild, LSCustomElement } from '../../types';
import { createElement } from '../createElement';
import { insertChildAt } from './insertChildAt';

export function insertNewChild(self: LSCustomElement, parent: Node, index: number, childMap: ElementMapChild) {
  const newChild = createElement(self, childMap);
  insertChildAt(parent, index, newChild);
}
