import { LSCustomElement } from '../types';

export function nodeIsHTMLElement(node: Node): node is LSCustomElement {
  return node && node.nodeType === Node.ELEMENT_NODE;
}
