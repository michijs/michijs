import { ClassJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../..';
import { ArrayJSXElement, EmptyType, FragmentJSXElement } from '../types';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { LSArrayNode } from './LSArrayNode';
import { LSChildNode } from './LSChildNode';
import { LSClassNode } from './LSClassNode';
import { LSEmptyNode } from './LSEmptyNode';
import { LSFragmentNode } from './LSFragmentNode';
import { LSFunctionNode } from './LSFunctionNode';
import { LSObjectNode } from './LSObjectNode';
import { LSPrimitiveNode } from './LSPrimitiveNode';

export const LSNode = (jsxElement: JSX.Element, isSVGParam?: boolean, self?: LSCustomElement): LSChildNode<JSX.Element> => {
  const [type, jsxElementTyped] = getJSXElementType(jsxElement);
  switch (type) {
    case JSXElementType.FUNCTION: {
      return new LSFunctionNode(jsxElementTyped<FunctionJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.ARRAY: {
      return new LSArrayNode(jsxElementTyped<ArrayJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.FRAGMENT: {
      return new LSFragmentNode(jsxElementTyped<FragmentJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.OBJECT: {
      return new LSObjectNode(jsxElementTyped<ObjectJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.CLASS: {
      return LSClassNode(jsxElementTyped<ClassJSXElement>(), isSVGParam, self);
    }
    case JSXElementType.EMPTY: {
      return new LSEmptyNode(jsxElementTyped<EmptyType>(), isSVGParam, self);
    }
    default: {
      return new LSPrimitiveNode(jsxElementTyped<PrimitiveType>(), isSVGParam, self);
    }
  }
};