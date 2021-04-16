import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../../types';
import { updateChildren } from './updateChildren';
import { removeUnexistentChilds } from './removeUnexistentChilds';
import { insertChildrenAt } from './insertChildrenAt';
import { createTextNodeContent } from '../createTextNodeContent';
import { findElement } from './findElement';
import { nodeIsHTMLElement } from '../../typeWards/nodeIsHTMLElement';
import { insertNewChildren } from '../insertNewChildren';
import { getMountPoint } from '../getMountPoint';
import { setAttributes } from '../setAttributes';
// import { cloneNode } from '../createElement';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { getRootNode } from '../getRootNode';
import { ElementFactory } from '../ElementFactory';

export function rerender(self: LSCustomElement) {
  self.componentWillUpdate?.();
  const newChildren = self.render();
  const parent = getMountPoint(self) as HTMLElement;
  updateElement(self, parent, [newChildren], getRootNode(self));
  self.componentDidUpdate?.();
}

export function updateElement(self: LSCustomElement | DocumentFragment, parent: HTMLElement, jsxElements: JSX.Element[] = [], rootElement) {
  if (jsxElements.length === 0 && parent.childNodes.length !== 0) {
    parent.textContent = '';
  }
  if (parent.childNodes.length === 0 && jsxElements.length !== 0) {
    insertNewChildren(self, parent, jsxElements);
  } else {
    let elementsCounter = 0;
    const movedElements = document.createDocumentFragment();
    jsxElements.forEach(jsxElement => {
      const pendingInsertions: (Node | string)[] = [];
      elementsCounter = updateFromJSXElement(self, parent, movedElements, jsxElement, elementsCounter, rootElement, pendingInsertions);
      if (pendingInsertions.length > 0) {
        insertChildrenAt(parent, pendingInsertions, elementsCounter);
        elementsCounter = elementsCounter + pendingInsertions.length;
      }
    });
    removeUnexistentChilds(parent, elementsCounter);
  }
}

function updateFromJSXElement(self: LSCustomElement | DocumentFragment, parent: HTMLElement, movedElements: DocumentFragment, jsxElement: JSX.Element, elementsCounter: number, rootElement: DocumentFragment, pendingInsertions: (Node | string)[]): number {
  const [type, jsxElementTyped] = getJSXElementType(jsxElement);
  switch (type) {
    case JSXElementType.FUNCTION: {
      const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
      const result = tag(attrs, children, self);
      return updateFromJSXElement(self, parent, movedElements, result, elementsCounter, rootElement, pendingInsertions);
    }
    case JSXElementType.ARRAY: {
      // const templates: Node[] = [];
      jsxElementTyped<ArrayJSXElement>().forEach(jsxArrayElement => {
        elementsCounter = updateFromJSXElement(self, parent, movedElements, jsxArrayElement, elementsCounter, rootElement, pendingInsertions);
        // elementsCounter = updateFromClone(self, parent, movedElements, jsxArrayElement, elementsCounter, templates, pendingInsertions, rootElement);
      });
      // insertChildrenAt(parent, elementsCounter, pendingInsertions);
      // elementsCounter = pendingInsertions.length + elementsCounter
      return elementsCounter;
    }
    case JSXElementType.FRAGMENT: {
      jsxElementTyped<FragmentJSXElement>().children.forEach(jsxArrayElement => {
        elementsCounter = updateFromJSXElement(self, parent, movedElements, jsxArrayElement, elementsCounter, rootElement, pendingInsertions);
      });
      return elementsCounter;
    }
    case JSXElementType.OBJECT: {
      const oldChild = updateFromObjectJSXElement(self, parent, movedElements, jsxElementTyped<ObjectJSXElement>(), elementsCounter, rootElement);
      if (!oldChild) {
        pendingInsertions.push(ElementFactory.fromObjectJSXElement(self, jsxElementTyped<ObjectJSXElement>()));
        return elementsCounter;
      } 
      const pendingInsertionsLength = pendingInsertions.length;
      if (pendingInsertionsLength > 0) {
        insertChildrenAt(parent, pendingInsertions, elementsCounter);
        pendingInsertions.splice(0, pendingInsertions.length);
      }
      return elementsCounter + 1 + pendingInsertionsLength;
      
    }
    default: {
      const oldChild = updateFromPrimitiveJSXElement(parent, jsxElementTyped<PrimitiveType>(), elementsCounter);
      if (!oldChild) {
        pendingInsertions.push(ElementFactory.fromPrimitiveJSXElement(jsxElementTyped<PrimitiveType>()));
        return elementsCounter;
      }
      
      const pendingInsertionsLength = pendingInsertions.length;
      if (pendingInsertionsLength > 0) {
        insertChildrenAt(parent, pendingInsertions, elementsCounter);
        pendingInsertions.splice(0, pendingInsertions.length);
      }
      return elementsCounter + 1 + pendingInsertionsLength;
      
    }
  }
}

// function updateFromClone(self: LSCustomElement | DocumentFragment, parent: HTMLElement, movedElements: DocumentFragment, jsxArrayElement: JSX.Element, elementsCounter: number, templates: Node[], pendingInsertions: (Node | string)[], rootElement: DocumentFragment): number {
//   const [type, jsxElementTyped] = getJSXElementType(jsxArrayElement);
//   switch (type) {
//     case JSXElementType.FUNCTION: {
//       const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
//       const result = tag(attrs, children, self);
//       return updateFromClone(self, parent, movedElements, result, elementsCounter, templates, pendingInsertions, rootElement)
//     }
//     case JSXElementType.ARRAY: {
//       jsxElementTyped<ArrayJSXElement>().forEach(jsxArrayElement => {
//         elementsCounter = updateFromClone(self, parent, movedElements, jsxArrayElement, elementsCounter, templates, pendingInsertions, rootElement);
//       })
//       return elementsCounter;
//     }
//     case JSXElementType.FRAGMENT: {
//       jsxElementTyped<FragmentJSXElement>().children.forEach(fragmentChild => {
//         elementsCounter = updateFromClone(self, parent, movedElements, fragmentChild, elementsCounter, templates, pendingInsertions, rootElement);
//       })
//       return elementsCounter;
//     }
//     case JSXElementType.OBJECT: {
//       const ObjectJSXElement = jsxElementTyped<ObjectJSXElement>();
//       const oldChild = updateFromObjectJSXElement(self, parent, movedElements, ObjectJSXElement, elementsCounter, rootElement)//Go through the elements, if you find it, update him
//       if (!oldChild) {//If you find a clone and clones set is != 0 insert them
//         const clone = cloneNode(self, ObjectJSXElement, templates, false)
//         pendingInsertions.push(clone);
//         return elementsCounter;
//       } else {
//         const pendingInsertionsLength = pendingInsertions.length;
//         if (pendingInsertionsLength > 0) {
//           insertChildrenAt(parent, elementsCounter, pendingInsertions);
//           pendingInsertions.splice(0, pendingInsertions.length);
//         }
//         return elementsCounter + 1 + pendingInsertionsLength;
//       }
//     }
//     default: {
//       updateFromPrimitiveJSXElement(self, parent, jsxElementTyped<PrimitiveType>(), elementsCounter)
//       return elementsCounter + 1;
//     }
//   }
// }

export function updateFromObjectJSXElement(self: LSCustomElement | DocumentFragment, parent: HTMLElement, movedElements: DocumentFragment, finalElement: ObjectJSXElement, elementsCounter: number, rootElement: DocumentFragment) {
  const [needsToBeMoved, foundAtMovedElements, oldChild] = findElement(parent, movedElements, finalElement, elementsCounter, rootElement);
  if (oldChild) {//Element exists
    updateSingleElement(self, oldChild, finalElement, rootElement);
    if (needsToBeMoved) {//is in another position
      if (!foundAtMovedElements) {
        movedElements.append(parent.childNodes.item(elementsCounter));//Move element in position
      }
      insertChildrenAt(parent, oldChild, elementsCounter);
    }
  }
  return oldChild;
}

export function updateFromPrimitiveJSXElement(parent: HTMLElement, jsxElement: PrimitiveType, elementsCounter: number) {
  let oldChild = parent.childNodes[elementsCounter];
  oldChild = nodeIsHTMLElement(oldChild) ? undefined : oldChild;
  if (oldChild) {//Old child is an text node - I replace his text if it is different
    const newChildText = createTextNodeContent(jsxElement);
    if (parent.childNodes[elementsCounter].textContent !== newChildText) {//Texts are different - Update text content
      parent.childNodes[elementsCounter].textContent = newChildText;
    }
  }
  return oldChild;
}

export function updateSingleElement(self: LSCustomElement | DocumentFragment, oldChild: LSCustomElement, jsxElement: ObjectJSXElement, rootElement?: DocumentFragment, isUpdate = true) {
  setAttributes(self, oldChild, jsxElement['attrs'], isUpdate);
  // You can't tell if the children have changed, it must be the children's responsibility
  updateChildren(self, oldChild, jsxElement.children, rootElement);
}
