import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../../types';
import { updateChildren } from './updateChildren';
import { insertChildrenAt } from './insertChildrenAt';
import { createTextNodeContent } from '../createTextNodeContent';
import { nodeIsHTMLElement } from '../../typeWards/nodeIsHTMLElement';
import { insertNewChildren } from '../insertNewChildren';
import { getMountPoint } from '../getMountPoint';
import { setAttributes } from '../setAttributes';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
import { getRootNode } from '../getRootNode';
import { ElementFactory } from '../ElementFactory';
import { tagsAreDifferent } from '../tagsAreDifferent';

export function rerender(self: LSCustomElement) {
  self.componentWillUpdate?.();
  const newChildren = self.render();
  new ElementUpdater(self, getMountPoint(self) as HTMLElement).updateElement([newChildren]);
  self.componentDidUpdate?.();
}
export class ElementUpdater {
  self: LSCustomElement | DocumentFragment;
  rootNode: DocumentFragment;
  pendingInsertions: (Node | string)[] = [];
  movedElements = document.createDocumentFragment();
  elementsCounter = 0;
  elementToUpdate: HTMLElement;

  constructor(self: LSCustomElement | DocumentFragment, elementToUpdate: HTMLElement, rootNode: DocumentFragment = getRootNode(self)) {
    this.self = self;
    this.rootNode = rootNode;
    this.elementToUpdate = elementToUpdate;
  }

  updateElement(jsxElements: JSX.Element[] = []) {
    if (jsxElements.length === 0 && this.elementToUpdate.hasChildNodes()) {
      this.elementToUpdate.textContent = '';
    }
    if (!this.elementToUpdate.hasChildNodes() && jsxElements.length !== 0) {
      insertNewChildren(this.self, this.elementToUpdate, jsxElements);
    } else {
      jsxElements.forEach(jsxElement => {
        this.elementsCounter = this.updateFromJSXElement(jsxElement) + this.insertPendingInsertions();
      });
      this.removeLeftoverChildren();
    }
  }
  updateFromJSXElement(jsxElement: JSX.Element): number {
    const [type, jsxElementTyped] = getJSXElementType(jsxElement);
    switch (type) {
      case JSXElementType.FUNCTION: {
        const { tag, attrs, children } = jsxElementTyped<FunctionJSXElement>();
        const result = tag(attrs, children, this.self);
        return this.updateFromJSXElement(result);
      }
      case JSXElementType.ARRAY: {
        // const templates: Node[] = [];
        jsxElementTyped<ArrayJSXElement>().forEach(jsxArrayElement => {
          this.elementsCounter = this.updateFromJSXElement(jsxArrayElement);
          // elementsCounter = updateFromClone(self, parent, movedElements, jsxArrayElement, elementsCounter, templates, pendingInsertions, rootElement);
        });
        // insertChildrenAt(parent, elementsCounter, pendingInsertions);
        // elementsCounter = pendingInsertions.length + elementsCounter
        return this.elementsCounter;
      }
      case JSXElementType.FRAGMENT: {
        jsxElementTyped<FragmentJSXElement>().children.forEach(jsxArrayElement => {
          this.elementsCounter = this.updateFromJSXElement(jsxArrayElement);
        });
        return this.elementsCounter;
      }
      case JSXElementType.OBJECT: {
        const oldChild = this.updateFromObjectJSXElement(jsxElementTyped<ObjectJSXElement>());
        if (!oldChild) {
          this.pendingInsertions.push(ElementFactory.fromObjectJSXElement(this.self, jsxElementTyped<ObjectJSXElement>()));
          return this.elementsCounter;
        }
        return this.elementsCounter + 1 + this.insertPendingInsertions();
      }
      default: {
        const oldChild = this.updateFromPrimitiveJSXElement(jsxElementTyped<PrimitiveType>());
        if (!oldChild) {
          this.pendingInsertions.push(ElementFactory.fromPrimitiveJSXElement(jsxElementTyped<PrimitiveType>()));
          return this.elementsCounter;
        }
        return this.elementsCounter + 1 + this.insertPendingInsertions();
      }
    }
  }

  insertPendingInsertions() {
    const pendingInsertionsLength = this.pendingInsertions.length;
    if (pendingInsertionsLength > 0) {
      insertChildrenAt(this.elementToUpdate, this.pendingInsertions, this.elementsCounter);
      this.pendingInsertions = [];
    }
    return pendingInsertionsLength;
  }

  updateFromObjectJSXElement(objectJSXElement: ObjectJSXElement) {
    const [needsToBeMoved, foundAtMovedElements, oldChild] = this.findElement(objectJSXElement);
    if (oldChild) {//Element exists
      if (!tagsAreDifferent(objectJSXElement, oldChild)) {
        setAttributes(this.self, oldChild, objectJSXElement.attrs, true);
        // You can't tell if the children have changed, it must be the children's responsibility
        updateChildren(this.self, oldChild, objectJSXElement.children, this.rootNode);
        if (needsToBeMoved) {//is in another position
          if (!foundAtMovedElements) {
            this.movedElements.append(this.elementToUpdate.childNodes.item(this.elementsCounter));//Move element in position
          }
          insertChildrenAt(this.elementToUpdate, [oldChild], this.elementsCounter);
        }
      } else {
        return undefined;
      }
    }
    return oldChild;
  }

  updateFromPrimitiveJSXElement(jsxElement: PrimitiveType) {
    const childNodes = this.elementToUpdate.childNodes;
    let oldChild = childNodes.item(this.elementsCounter);
    oldChild = nodeIsHTMLElement(oldChild) ? undefined : oldChild;
    if (oldChild) {//Old child is an text node - I replace his text if it is different
      const newChildText = createTextNodeContent(jsxElement);
      if (childNodes[this.elementsCounter].textContent !== newChildText) {//Texts are different - Update text content
        childNodes[this.elementsCounter].textContent = newChildText;
      }
    }
    return oldChild;
  }
  removeLeftoverChildren() {
    const childNodes = this.elementToUpdate.childNodes;
    let itemToRemove = childNodes.item(this.elementsCounter);
    while(itemToRemove){
      itemToRemove.remove();
      itemToRemove = childNodes.item(this.elementsCounter);
    }
  }
  findElement(jsxElement: ObjectJSXElement): [boolean, boolean, LSCustomElement] {
    const childNodeAtIndex = this.elementToUpdate.childNodes.item(this.elementsCounter);
    if (nodeIsHTMLElement(childNodeAtIndex) && childNodeAtIndex.id === jsxElement.attrs.id) {
      return [false, false, childNodeAtIndex];
    }
    const movedElement = this.movedElements.getElementById(jsxElement.attrs.id);
    if (movedElement)
      return [true, true, movedElement as LSCustomElement];

    return [true, false, this.rootNode ? this.rootNode.getElementById(jsxElement.attrs.id) as LSCustomElement : undefined];
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