import { LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { createChildrenNodesAndAppend } from './createChildrenNodesAndAppend';
import { LSNodeType } from './LSNode';
import { replaceNodeWith } from './replaceNodeWith';
import { setAttributes, SetAttributesProps } from './utils/setAttributes';

export const LSObjectNode = (jsxElement: ObjectJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  let el: Element;
  const isSVG = isSVGParam || (jsxElement.tag && jsxElement.tag.toLowerCase() === 'svg');
  if (isSVG) {
    if (jsxElement.attrs?.is) {
      el = document.createElementNS('http://www.w3.org/2000/svg', jsxElement.tag, jsxElement.attrs.is);
    } else {
      el = document.createElementNS('http://www.w3.org/2000/svg', jsxElement.tag);
    }
  }
  else if (jsxElement.attrs?.is) {
    el = document.createElement(jsxElement.tag, jsxElement.attrs.is);
  } else {
    el = document.createElement(jsxElement.tag);
  }
  const events: SetAttributesProps['events'] = {};
  setAttributes({
    target: el,
    newAttributes: jsxElement.attrs,
    events,
    self
  });
  const childrenNodes = createChildrenNodesAndAppend(el, jsxElement.attrs.children, isSVG, self);

  const node: LSNodeType = {
    el,
    children: childrenNodes,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.OBJECT && typedNewJSXElement<ObjectJSXElement>().tag === jsxElement.tag && typedNewJSXElement<ObjectJSXElement>().attrs.children.length === jsxElement.attrs.children.length) {
        setAttributes({
          target: node.el as Element,
          newAttributes: typedNewJSXElement<ObjectJSXElement>().attrs,
          oldAttributes: jsxElement.attrs,
          events,
          self
        });
        // They must always be the same number of children for the node
        node.children = node.children.map((childNode, i) => childNode.updateElement(typedNewJSXElement<ObjectJSXElement>().attrs.children[i]));
        jsxElement.attrs = typedNewJSXElement<ObjectJSXElement>().attrs;
        return node;
      }
      // intentional isSVGParam
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith: (...nodes) => (node.el as Element).replaceWith(...nodes),
    remove: () => (node.el as Element).remove(),
  };
  return node;
};