import { LSCustomElement } from '../../types';
import { LSNode } from './LSNode';

export const createChildrenNodesAndAppend = (el: ParentNode, children: JSX.Element[], isSVGParam: boolean, self: LSCustomElement) => {
  // TODO: ver que es más rapido
  const childrenNodes = children.map(x => LSNode(x, isSVGParam, self));

  if (childrenNodes.length > 0) {
    const childrenElements = childrenNodes.map(x => x.el);
    el.append(...childrenElements);
  }
  return childrenNodes;
};