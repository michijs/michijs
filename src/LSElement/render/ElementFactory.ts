import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../types';
import { createTextNodeContent } from './createTextNodeContent';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
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
  // static cloneJSXElement(self: LSCustomElement | DocumentFragment | null, jsxArrayElement: JSX.Element, templates: Node[], isSVGParam: boolean): Node | string {
  //   const [type, jsxElementTyped] = getJSXElementType(jsxArrayElement);
  //   switch (type) {
  //     // case JSXElementType.FUNCTION: {
  //     //   const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
  //     //   const result = tag(attrs, children, self);
  //     //   return this.cloneJSXElement(self, result, templates, isSVGParam)
  //     // }
  //     case JSXElementType.ARRAY: {
  //       const fragment = document.createDocumentFragment();
  //       fragment.append(...jsxElementTyped<ArrayJSXElement>().map(jsxArrayElement => this.cloneJSXElement(self, jsxArrayElement, templates, isSVGParam)));
  //       return fragment;
  //     }
  //     case JSXElementType.FRAGMENT: {
  //       const fragment = document.createDocumentFragment();
  //       const fragmentTemplates = [];
  //       fragment.append(...jsxElementTyped<FragmentJSXElement>().children.map(fragmentChild => this.cloneJSXElement(self, fragmentChild, fragmentTemplates, isSVGParam)));
  //       return fragment;
  //     }
  //     case JSXElementType.OBJECT: {
  //       const objectJSXElement = jsxElementTyped<ObjectJSXElement>();
  //       const pureObjectJSXElement = objectJSXElementToPureObjectJSXElement(self, objectJSXElement)
  //       const htmlElementTemplate = findTemplate(templates, pureObjectJSXElement);
  //       if (htmlElementTemplate) {
  //         const clone = htmlElementTemplate.cloneNode(true);
  //         updateClone(self, clone as LSCustomElement, pureObjectJSXElement)
  //         return clone;
  //       } else {
  //         const newTemplate = this.fromObjectJSXElement(self, objectJSXElement, isSVGParam);
  //         templates.push(newTemplate);
  //         return newTemplate;
  //       }
  //     }
  //     default: {
  //       return createTextNodeContent(jsxElementTyped<PrimitiveType>())
  //     }
  //   }
  // }
}


// export function objectJSXElementToPureObjectJSXElement(self: LSCustomElement | DocumentFragment, jsxElement: ObjectJSXElement) {
//   const children = []
//   jsxElement.children.forEach(child => {
//     const pure = toPureObjectJSXElement(self, child);
//     if (Array.isArray(pure)) {
//       children.push(...pure);
//     } else {
//       children.push(pure);
//     }
//   })

//   jsxElement.children = children;
//   return jsxElement as PureObjectJSXElement;
// }

// export function toPureObjectJSXElement(self: LSCustomElement | DocumentFragment, jsxElement: JSX.Element): PureObjectJSXElement | string | (PureObjectJSXElement | string)[] {
//   const [type, jsxElementTyped] = getJSXElementType(jsxElement);
//   switch (type) {
//     case JSXElementType.ARRAY: {
//       const children = []
//       jsxElementTyped<ArrayJSXElement>().forEach(child => {
//         const pure = toPureObjectJSXElement(self, child);
//         if (Array.isArray(pure)) {
//           children.push(...pure);
//         } else {
//           children.push(pure);
//         }
//       })
//       return children
//     }
//     case JSXElementType.FRAGMENT: {
//       const children = []
//       jsxElementTyped<FragmentJSXElement>().children.forEach(child => {
//         const pure = toPureObjectJSXElement(self, child);
//         if (Array.isArray(pure)) {
//           children.push(...pure);
//         } else {
//           children.push(pure);
//         }
//       })
//       return children;
//     }
//     // case JSXElementType.FUNCTION: {
//     //   const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
//     //   const result = tag(attrs, children, self);
//     //   return toPureObjectJSXElement(self, result);
//     // }
//     case JSXElementType.OBJECT: {
//       const objectJSXElement = jsxElementTyped<ObjectJSXElement>();
//       objectJSXElement.children = objectJSXElement.children.map(child => toPureObjectJSXElement(self, child))
//       return objectJSXElement as PureObjectJSXElement;
//     }
//     default: {
//       return jsxElement as PureObjectJSXElement;
//     }
//   }
// }


// export function updateClone(self: LSCustomElement | DocumentFragment, oldChild: LSCustomElement, jsxElement: PureObjectJSXElement | string) {
//   const [type, jsxElementTyped] = getJSXElementType(jsxElement);
//   if (type === JSXElementType.OBJECT) {
//     setAttributes(self, oldChild, jsxElement['attrs'], false);

//     jsxElementTyped<PureObjectJSXElement>().children.forEach((child, index) => {
//       updateClone(self, oldChild.childNodes.item(index) as LSCustomElement, child)
//     })
//   } else {
//     const newChildText = createTextNodeContent(jsxElement);
//     if (oldChild.textContent !== newChildText) {//Texts are different - Update text content
//       oldChild.textContent = newChildText;
//     }
//   }
// }