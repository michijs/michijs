import { ArrayJSXElement, FragmentJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement, PrimitiveType } from '../types';
import { insertChildrenAt } from '../DOM/insertChildrenAt';
import { createText } from '../DOM/createText';
import { nodeIsHTMLElement } from '../typeWards/nodeIsHTMLElement';
import { AttributeManager } from './AttributeManager';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { getRootNode } from '../DOM/getRootNode';
import { ElementFactory } from './ElementFactory';
import { tagsAreDifferent } from '../DOM/tagsAreDifferent';
import { isCustomElement } from '../utils/isCustomElement';
import { getShadowRoot } from '../utils/getShadowRoot';
import { insertNewChildren } from '../DOM/insertNewChildren';

export class ElementUpdater {
  private self: LSCustomElement | null;
  private rootNode: DocumentFragment;
  private pendingInsertions: (Node | string)[] = [];
  private movedElements = document.createDocumentFragment();
  private elementsCounter = 0;
  private elementToUpdate: Element;

  constructor(self: LSCustomElement, elementToUpdate: Element, rootNode: DocumentFragment = getRootNode(self)) {
    this.self = self;
    this.rootNode = rootNode;
    this.elementToUpdate = elementToUpdate;
  }

  updateElement(jsxElements: JSX.Element[] = []) {
    // if (jsxElements.length === 0) {
    //   if (this.elementToUpdate.hasChildNodes()) {
    //     console.log('pase')
    //     this.elementToUpdate.textContent = '';
    //   }
    // } else {
    if (!this.elementToUpdate.hasChildNodes()) {
      insertNewChildren(this.self, this.elementToUpdate, jsxElements);
    } else {
      jsxElements.forEach(jsxElement => {
        this.elementsCounter = this.updateFromJSXElement(jsxElement) + this.insertPendingInsertions();
      });
      this.removeLeftoverChildren();
    }
    // }
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
        AttributeManager.setAttributes(this.self, oldChild, objectJSXElement.attrs, true);
        // You can't tell if the children have changed, it must be the children's responsibility
        this.updateChildren(oldChild, objectJSXElement.children);
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
      const newChildText = createText(jsxElement);
      if (childNodes[this.elementsCounter].textContent !== newChildText) {//Texts are different - Update text content
        childNodes[this.elementsCounter].textContent = newChildText;
      }
    }
    return oldChild;
  }
  updateChildren(elementToUpdate: LSCustomElement, jsxElements: JSX.Element[]) {
    if (!elementToUpdate.staticChildren && (!isCustomElement(elementToUpdate) || getShadowRoot(elementToUpdate))) {
      new ElementUpdater(this.self, elementToUpdate, this.rootNode).updateElement(jsxElements);
    }
  }
  removeLeftoverChildren() {
    if (this.elementsCounter === 0) {//Already validated if exists childNodes
      this.elementToUpdate.textContent = '';
    } else {
      const childNodes = this.elementToUpdate.childNodes;
      let itemToRemove = childNodes.item(this.elementsCounter);
      while (itemToRemove) {
        itemToRemove.remove();
        itemToRemove = childNodes.item(this.elementsCounter);
      }
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