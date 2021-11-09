import { ArrayJSXElement, LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { createChildrenNodesAndAppend } from './createChildrenNodesAndAppend';
import { LSNodeType } from './LSNode';
import { replaceNodeWith } from './replaceNodeWith';

export const LSArrayNode = (jsxElement: ArrayJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  // const templateNode = LSNode(jsxElement[0]);
  const el = document.createDocumentFragment();

  const childrenNodes = createChildrenNodesAndAppend(el, jsxElement, isSVGParam, self);

  const node: LSNodeType = {
    el,
    children: childrenNodes,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.ARRAY) {
        // typedNewJSXElement<ArrayJSXElement>().forEach((newJSXElementItem: ObjectJSXElement, i) => {
        //     if ('attrs' in newJSXElementItem && 'key' in newJSXElementItem['attrs']) {//Comparable elements
        //         if(childrenNodes[i].)

        //     } else {

        //     }
        // })
        childrenNodes.forEach((childNode, i) => childNode.updateElement(typedNewJSXElement<ObjectJSXElement>().attrs.children[i]));
        return node;
      }
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith(nodes) {
      childrenNodes[0].replaceWith(nodes);
      node.remove();
    },
    remove() {
      childrenNodes.forEach(x => x.remove());
    }
  };
  return node;
};