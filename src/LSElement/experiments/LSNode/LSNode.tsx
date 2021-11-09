import { ArrayJSXElement, ClassJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../../..';
import { EmptyType } from '../../types';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { LSArrayNode } from './LSArrayNode';
import { LSClassNode } from './LSClassNode';
import { LSEmptyNode } from './LSEmptyNode';
import { LSFragmentNode } from './LSFragmentNode';
import { LSFunctionNode } from './LSFunctionNode';
import { LSObjectNode } from './LSObjectNode';
import { LSPrimitiveNode } from './LSPrimitiveNode';

export type LSNodeType = {
  el: Node | DocumentFragment,
  children: LSNodeType[] | null,
  updateElement: (newJSXElement: JSX.Element) => LSNodeType,
  replaceWith: ChildNode['replaceWith'],
  remove: ChildNode['remove']
}

export const LSNode = (jsxElement: JSX.Element, isSVGParam?: boolean, self?: LSCustomElement): LSNodeType => {
  const [type, jsxElementTyped] = getJSXElementType(jsxElement);
  switch (type) {
    case JSXElementType.FUNCTION: {
      return LSFunctionNode(jsxElementTyped<FunctionJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.ARRAY: {
      return LSArrayNode(jsxElementTyped<ArrayJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.FRAGMENT: {
      return LSFragmentNode(jsxElementTyped<FragmentJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.OBJECT: {
      return LSObjectNode(jsxElementTyped<ObjectJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.CLASS: {
      return LSClassNode(jsxElementTyped<ClassJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.EMPTY: {
      return LSEmptyNode(jsxElementTyped<EmptyType>(), isSVGParam, self);
    }
    default: {
      return LSPrimitiveNode(jsxElementTyped<PrimitiveType>(), isSVGParam, self);
    }
  }
};