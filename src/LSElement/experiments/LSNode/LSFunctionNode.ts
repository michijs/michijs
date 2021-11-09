import { FunctionJSXElement, LSCustomElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNode, LSNodeType } from './LSNode';
import { replaceNodeWith } from './replaceNodeWith';

const toNonFunctionJSXElement = (jsxElement: FunctionJSXElement, self: LSCustomElement) => {
  const { tag, attrs } = jsxElement;
  const functionResult = tag(attrs, self);
  const [type, typedNewJSXElement] = getJSXElementType(functionResult);

  if (type === JSXElementType.FUNCTION)
    return toNonFunctionJSXElement(typedNewJSXElement<FunctionJSXElement>(), self);
  return functionResult;
};

export const LSFunctionNode = (jsxElement: FunctionJSXElement, isSVGParam: boolean, self: LSCustomElement) => {
  const functionResult = toNonFunctionJSXElement(jsxElement, self);

  const lsNodeResult = LSNode(functionResult, isSVGParam, self);
  const node: LSNodeType = {
    el: lsNodeResult.el,
    children: lsNodeResult.children,
    updateElement: (newJSXElement: JSX.Element) => {
      const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
      if (type === JSXElementType.FUNCTION && typedNewJSXElement<FunctionJSXElement>().tag === jsxElement.tag) {
        const newFunctionResult = toNonFunctionJSXElement(typedNewJSXElement<FunctionJSXElement>(), self);
        jsxElement = typedNewJSXElement<FunctionJSXElement>();
        const result = lsNodeResult.updateElement(newFunctionResult);
        node.el = result.el;
        node.children = result.children;
        node.replaceWith = (...nodes) => result.replaceWith(...nodes);
        node.remove = (...nodes) => result.remove(...nodes);
        return node;
      }
      // intentional isSVGParam
      return replaceNodeWith(node, newJSXElement, isSVGParam, self);
    },
    replaceWith: (...nodes) => lsNodeResult.replaceWith(...nodes),
    remove: () => lsNodeResult.remove(),
  };
  return node;
};