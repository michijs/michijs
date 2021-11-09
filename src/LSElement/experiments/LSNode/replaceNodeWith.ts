import { LSCustomElement } from '../../..';
import { LSNode, LSNodeType } from './LSNode';

export const replaceNodeWith = (node: LSNodeType, newJSXElement: JSX.Element, isSVGParam: boolean, self: LSCustomElement) => {
  const newNode = LSNode(newJSXElement, isSVGParam, self);
  node.replaceWith(newNode.el);
  return newNode;
};