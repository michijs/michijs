import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../types';
import { createText } from '../DOM/createText';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { insertNewChildren } from '../DOM/insertNewChildren';
import { AttributeManager } from './AttributeManager';
// import { findTemplate } from './findTemplate';

export abstract class ElementFactory {
  static fromJSXElement(self: LSCustomElement | null, jsxElement: JSX.Element, isSVGParam?: boolean): string | Node {
    const [type, jsxElementTyped] = getJSXElementType(jsxElement);
    switch (type) {
      case JSXElementType.FUNCTION: {
        const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
        const result = tag(attrs, children, self);
        return this.fromJSXElement(self, result, isSVGParam);
      }
      case JSXElementType.ARRAY: {
        // const templates = [];
        // const fragment = document.createDocumentFragment();
        // fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => this.cloneJSXElement(self, jsxArrayElement, templates, isSVGParam)));
        const fragment = document.createDocumentFragment();
        fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => this.fromJSXElement(self, jsxArrayElement, isSVGParam)));
        return fragment;
      }
      case JSXElementType.FRAGMENT: {
        const fragment = document.createDocumentFragment();
        fragment.append(...jsxElementTyped<FragmentJSXElement>().children.map(jsxArrayElement => this.fromJSXElement(self, jsxArrayElement, isSVGParam)));
        return fragment;
      }
      case JSXElementType.OBJECT: {
        return this.fromObjectJSXElement(self, jsxElementTyped<ObjectJSXElement>(), isSVGParam);
      }
      default: {
        return this.fromPrimitiveJSXElement(jsxElementTyped<PrimitiveType>());
      }
    }
  }
  static fromObjectJSXElement(self: LSCustomElement | null, jsxElement: ObjectJSXElement, isSVGParam?: boolean) {
    let element: Element;
    const { tag, attrs, children } = jsxElement;
    const isSVG = isSVGParam || (tag && tag.toLowerCase() === 'svg');
    if (isSVG) {
      if (attrs?.is) {
        element = document.createElementNS('http://www.w3.org/2000/svg', tag, attrs.is);
      } else {
        element = document.createElementNS('http://www.w3.org/2000/svg', tag);
      }
    }
    else if (attrs?.is) {
      element = document.createElement(tag, attrs.is);
    } else {
      element = document.createElement(tag);
    }
    AttributeManager.setAttributes(self, element, attrs, false);
    if (children.length > 0) {
      insertNewChildren(self, element as Element, children, isSVG);
    }
    return element;
  }
  static fromPrimitiveJSXElement(jsxElement: PrimitiveType) {
    return createText(jsxElement);
  }
}