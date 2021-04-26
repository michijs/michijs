import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../types';
import { createText } from '../DOM/createText';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { insertNewChildren } from '../DOM/insertNewChildren';
import { AttributeManager } from './AttributeManager';
// import { findTemplate } from './findTemplate';

export abstract class ElementFactory {
  static fromJSXElement(jsxElement: JSX.Element, self: LSCustomElement | null, isSVGParam?: boolean, pendingInsertions?: Array<string | Node>) {
    const [type, jsxElementTyped] = getJSXElementType(jsxElement);
    switch (type) {
      case JSXElementType.FUNCTION: {
        const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
        const result = tag(attrs, children, self);
        this.fromJSXElement(result, self, isSVGParam, pendingInsertions);
        break;
      }
      case JSXElementType.ARRAY: {
        // const templates = [];
        // const fragment = document.createDocumentFragment();
        // fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => this.cloneJSXElement(self, jsxArrayElement, templates, isSVGParam)));
        jsxElementTyped<ArrayJSXElement>().forEach(jsxArrayElement => this.fromJSXElement(jsxArrayElement, self, isSVGParam, pendingInsertions));
        break;
      }
      case JSXElementType.FRAGMENT: {
        jsxElementTyped<FragmentJSXElement>().children.forEach(jsxArrayElement => this.fromJSXElement(jsxArrayElement, self, isSVGParam, pendingInsertions));
        break;
      }
      case JSXElementType.OBJECT: {
        pendingInsertions.push(this.fromObjectJSXElement(jsxElementTyped<ObjectJSXElement>(), self, isSVGParam));
        break;
      }
      default: {
        pendingInsertions.push(this.fromPrimitiveJSXElement(jsxElementTyped<PrimitiveType>()));
        break;
      }
    }
  }
  static fromObjectJSXElement(jsxElement: ObjectJSXElement, self: LSCustomElement | null, isSVGParam?: boolean) {
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
      insertNewChildren(self, element, children, isSVG);
    }
    return element;
  }
  static fromPrimitiveJSXElement(jsxElement: PrimitiveType) {
    return createText(jsxElement);
  }
}