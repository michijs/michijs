import { FunctionJSXElement, LSCustomElement } from '../..';
import { SingleJSXElement } from '../types';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { LSChildNode } from './LSChildNode';
import { LSNode } from './LSNode';

const toNonFunctionJSXElement = (jsxElement: FunctionJSXElement, self: LSCustomElement) => {
  const { tag, attrs } = jsxElement;
  const functionResult = tag(attrs as unknown, self);
  const [type, typedNewJSXElement] = getJSXElementType(functionResult);

  if (type === JSXElementType.FUNCTION)
    return toNonFunctionJSXElement(typedNewJSXElement<FunctionJSXElement>(), self);
  return functionResult;
};

export class LSFunctionNode implements LSChildNode<FunctionJSXElement> {
  node: LSChildNode<JSX.Element>;
  self: LSCustomElement;
  jsxElement: FunctionJSXElement;
  isSVG: boolean;
  public el: ChildNode;

  constructor(jsxElement: FunctionJSXElement, isSVGParam: boolean, self: LSCustomElement) {
    const functionResult = toNonFunctionJSXElement(jsxElement, self);
    this.jsxElement = jsxElement;
    this.isSVG = isSVGParam;
    this.self = self;
    this.node = LSNode(functionResult, isSVGParam, self);
  }
  replaceWith(newJSXElement: SingleJSXElement, isSVG = this.isSVG) {
    return this.node.replaceWith(newJSXElement, isSVG);
  }
  replaceNodeWith(newNode: LSChildNode<SingleJSXElement>) {
    return this.node.replaceNodeWith(newNode);
  }
  remove() {
    return this.node.remove();
  }
  after(jsxElement: SingleJSXElement[]) {
    return this.node.after(jsxElement);
  }
  afterNodes(node: LSChildNode<SingleJSXElement>[]) {
    return this.node.afterNodes(node);
  }
  updateElement(newJSXElement: JSX.Element): LSChildNode<any> {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.FUNCTION && typedNewJSXElement<FunctionJSXElement>().tag === this.jsxElement.tag) {
      const newFunctionResult = toNonFunctionJSXElement(typedNewJSXElement<FunctionJSXElement>(), this.self);
      return this.node.updateElement(newFunctionResult);
    }
    return this.node.replaceWith(newJSXElement, this.isSVG);
  }
  valueOf(): Node {
    return this.node.valueOf();
  }
}