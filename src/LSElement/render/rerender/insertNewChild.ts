import { ElementMapChild } from '../../types';
import { createElement } from '../createElement';
import { insertChildAt } from './insertChildAt';

export function insertNewChild(parent: HTMLElement, index: number, childMap: ElementMapChild) {
  const newChild = createElement(childMap);
  insertChildAt(parent, index, newChild);
}
