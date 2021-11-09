import { FragmentJSXElement, LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { createChildrenNodesAndAppend } from './createChildrenNodesAndAppend';
import { LSNodeType } from './LSNode';
// import { LSPrimitiveNode } from "./LSPrimitiveNode";
import { replaceNodeWith } from './replaceNodeWith';

export const LSFragmentNode = (jsxElement: FragmentJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  const el = document.createDocumentFragment();

  const childrenNodes = createChildrenNodesAndAppend(el, jsxElement.attrs.children, isSVGParam, self);

  const node: LSNodeType = {
    el,
    children: childrenNodes,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.FRAGMENT && typedNewJSXElement<FragmentJSXElement>().attrs.children.length === jsxElement.attrs.children.length) {
        // They must always be the same number of children for the node
        node.children = node.children.map((childNode, i) => childNode.updateElement(typedNewJSXElement<ObjectJSXElement>().attrs.children[i]));
        jsxElement.attrs = typedNewJSXElement<FragmentJSXElement>().attrs;
        return node;
      }
      // intentional isSVGParam
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith(...nodes){
      // el.replaceWith(...nodes)
      // debugger;
      childrenNodes[0].replaceWith(...nodes);
      node.remove();
    },
    remove(){
      childrenNodes.forEach(x => x.remove());
    }
  };
  return node;
};