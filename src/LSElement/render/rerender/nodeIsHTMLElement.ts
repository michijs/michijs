import { LSCustomElement } from '../../types';

export function nodeIsHTMLElement(node: Node): node is LSCustomElement {
  return node.nodeType === Node.ELEMENT_NODE;
}
