import { LSCustomElement, PrimitiveType } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNodeType } from './LSNode';
import { replaceNodeWith } from './replaceNodeWith';

export const LSPrimitiveNode = (jsxElement: PrimitiveType, isSVGParam: boolean, self: LSCustomElement) => {
  const el = document.createTextNode(jsxElement.toString());

  const node: LSNodeType = {
    el,
    children: null,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.PRIMITIVE) {
        if (jsxElement !== newJSXElement) {
          el.textContent = typedNewJSXElement<PrimitiveType>().toString();
          jsxElement = typedNewJSXElement<PrimitiveType>();
        }
        return node;
      }
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith: (...nodes) => (node.el as Text).replaceWith(...nodes),
    remove: () => (node.el as Text).remove(),
  };

  return node;
};