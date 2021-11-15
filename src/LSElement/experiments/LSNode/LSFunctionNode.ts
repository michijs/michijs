import { FunctionJSXElement, LSCustomElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSNode } from './LSNode';

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

  const node = LSNode(functionResult, isSVGParam, self);

  const originalNodeUpdateElementFn = node.updateElement.bind(node);

  node.updateElement = (newJSXElement: JSX.Element) => {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.FUNCTION && typedNewJSXElement<FunctionJSXElement>().tag === jsxElement.tag) {
      const newFunctionResult = toNonFunctionJSXElement(typedNewJSXElement<FunctionJSXElement>(), self);
      const result = originalNodeUpdateElementFn(newFunctionResult);
      return result;
    }
    // intentional isSVGParam
    return node.replaceWith(newJSXElement, isSVGParam);
  };

  return node;
};