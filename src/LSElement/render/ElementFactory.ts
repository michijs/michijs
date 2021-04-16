import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../types';
import { createTextNodeContent } from './createTextNodeContent';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
// import { updateSingleElement } from './rerender';
import { insertNewChildren } from './insertNewChildren';
import { setAttributes } from './setAttributes';
// import { findTemplate } from './findTemplate';

export abstract class ElementFactory {
  static fromJSXElement(self: LSCustomElement | DocumentFragment | null, jsxElement: JSX.Element, isSVGParam?: boolean): string | Node {
    const [type, jsxElementTyped] = getJSXElementType(jsxElement);
    switch (type) {
      case JSXElementType.FUNCTION: {
        const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
        const result = tag(attrs, children, self);
        return this.fromJSXElement(self, result, isSVGParam);
      }
      case JSXElementType.ARRAY: {
        // const templates = [];
        // fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => cloneNode(self, jsxArrayElement, templates, isSVGParam)));
        // const templates = [];
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
  static fromObjectJSXElement(self: LSCustomElement | DocumentFragment | null, jsxElement: ObjectJSXElement, isSVGParam?: boolean) {
    let element: Node;
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
    setAttributes(self, element as LSCustomElement, attrs, false);
    if (children.length > 0) {
      insertNewChildren(self, element as Element, children, isSVG);
    }
    return element;
  }
  static fromPrimitiveJSXElement(jsxElement: PrimitiveType) {
    return createTextNodeContent(jsxElement);
  }
}

// export function cloneNode(self: LSCustomElement | DocumentFragment | null, jsxArrayElement: JSX.Element, templates: Node[], isSVGParam: boolean): Node | string {
//   const [type, jsxElementTyped] = getJSXElementType(jsxArrayElement);
//   switch (type) {
//     case JSXElementType.FUNCTION: {
//       const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
//       const result = tag(attrs, children, self);
//       return cloneNode(self, result, templates, isSVGParam)
//     }
//     case JSXElementType.ARRAY: {
//       const fragment = document.createDocumentFragment();
//       fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => cloneNode(self, jsxArrayElement, templates, isSVGParam)));
//       return fragment;
//     }
//     case JSXElementType.FRAGMENT: {
//       const fragment = document.createDocumentFragment();
//       const fragmentTemplates = [];
//       fragment.append(...jsxElementTyped<FragmentJSXElement>().children.map(fragmentChild => cloneNode(self, fragmentChild, fragmentTemplates, isSVGParam)));
//       return fragment;
//     }
//     case JSXElementType.OBJECT: {
//       const objectJSXElement = jsxElementTyped<ObjectJSXElement>();
//       const htmlElementTemplate = findTemplate(templates, objectJSXElement);
//       if (htmlElementTemplate) {
//         const clone = htmlElementTemplate.cloneNode(true)
//         updateSingleElement(self, clone as LSCustomElement, objectJSXElement, undefined, false)
//         return clone;
//       } else {
//         const newTemplate = createObjectJSXElement(self, objectJSXElement, isSVGParam);
//         templates.push(newTemplate);
//         return newTemplate;
//       }
//     }
//     default: {
//       return createTextNodeContent(jsxElementTyped<PrimitiveType>())
//     }
//   }
// }
