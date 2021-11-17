import { AnyObject, ArrayJSXElement, ClassJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement } from '../..';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { LSChildNode } from './LSChildNode';
import { LSNode } from './LSNode';
import { LSVirtualFragmentNode } from './LSVirtualFragmentNode';
export class LSArrayNode extends LSVirtualFragmentNode<ArrayJSXElement> {
  constructor(jsxElement: ArrayJSXElement, isSVGParam: boolean, self: LSCustomElement) {
    super(jsxElement, isSVGParam, self);
    this.createAndAppend(jsxElement);
  }
  createAndAppend(children: JSX.Element[]) {
    this.childrenNodes = children.map(x => LSNode(x, this.isSVG, this.self));
  }
  removeItem(i: number): void {
    this.childrenNodes[i].remove();
    this.childrenNodes.splice(i, 1);
  }
  insertItemsAt(i: number, node: LSChildNode<JSX.Element>[]) {
    if (this.childrenNodes.length > i) {
      if (i !== 0) {
        this.childrenNodes[i - 1].afterNodes(node);
        this.childrenNodes.splice(i, 0, ...node);
      } else {
        this.pivotNode.afterNodes(node);
        this.childrenNodes.unshift(...node);
      }
    } else {
      this.childrenNodes.push(...this.afterNodes(node));
    }
    return node;
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.ARRAY) {
      const movedNodes = new Array<LSChildNode<AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement>>();
      if (typedNewJSXElement<ArrayJSXElement>().length === 0)//No new elements - should remove every element
        this.clear();
      else if (this.childrenNodes.length === 0)//Only new elements
        this.childrenNodes.push(...this.after(typedNewJSXElement<ArrayJSXElement>()));
      else { //Both have new / changed elements
        let pendingInsertions = new Array<LSChildNode<JSX.Element>>();
        typedNewJSXElement<ArrayJSXElement>().forEach((newChild, index) => {
          let i = index - pendingInsertions.length;
          if (i < this.childrenNodes.length) {
            const oldChild = this.childrenNodes[i].jsxElement;
            if (typeof newChild === 'object' && 'key' in newChild) {
              if (typeof oldChild === 'object' && 'key' in oldChild) {
                if (newChild.key === oldChild.key) {// Same node - I must update it
                  this.insertItemsAt(i, pendingInsertions);
                  i = index;
                  pendingInsertions = [];
                  this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
                } else { // Different node - probably moved
                  const movedNodeIndex = movedNodes.findIndex(x => x.jsxElement.key === newChild.key);
                  if (movedNodeIndex === -1) {// If it is not between the moved nodes - Is it located in another part of the node?
                    const movedNodeIndex = this.childrenNodes.slice(i).findIndex(x =>
                      typeof x.jsxElement === 'object' && 'key' in x.jsxElement && x.jsxElement.key === newChild.key
                    );
                    if (movedNodeIndex === -1) { // Node does not exist - I must create it
                      pendingInsertions.push(LSNode(newChild, this.isSVG, this.self));
                    } else { // The node exists - I must move it to the right place
                      // Could be further forward between nodes - I move it to movedNodes
                      movedNodes.push(this.childrenNodes[i] as LSChildNode<ObjectJSXElement>);
                      this.removeItem(i);
                      const finalMovedNodeIndex = movedNodeIndex + i - 1;
                      if (finalMovedNodeIndex === i) {
                        this.insertItemsAt(i, pendingInsertions);
                        i = index;
                        pendingInsertions = [];
                        this.childrenNodes[i] = this.childrenNodes[finalMovedNodeIndex].updateElement(newChild);
                      } else {// It is not located elsewhere in the node - I must create it
                        const movedNode = this.childrenNodes[finalMovedNodeIndex];
                        this.removeItem(finalMovedNodeIndex);
                        pendingInsertions.push(movedNode.updateElement(newChild));
                      }
                    }
                  } else { // If it is between the moved nodes - I must move it to the right place
                    const movedNode = movedNodes[movedNodeIndex];
                    movedNodes.splice(movedNodeIndex, 1);
                    pendingInsertions.push(movedNode.updateElement(newChild));
                  }
                }
              }
              // Different node - probably moved / replaced with a node without key
            } else if (typeof oldChild === 'object' && 'key' in oldChild) {
              this.insertItemsAt(i, pendingInsertions);
              i = index;
              pendingInsertions = [];
              // There is no need to remove it from the dom as it has already been replaced
              movedNodes.push(this.childrenNodes[i] as LSChildNode<ObjectJSXElement>);
              this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
            } else {// It is assumed to be the same node - Case in which it is a primitive node / empty / without key
              this.insertItemsAt(i, pendingInsertions);
              i = index;
              pendingInsertions = [];
              this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
            }
            // New nodes
          } else if (movedNodes.length > 0) {//If there are moved nodes I must first look for it among the moved ones
            const movedNodeIndex = typeof newChild === 'object' && 'key' in newChild ? movedNodes.findIndex(x => x.jsxElement.key === newChild.key) : undefined;
            if (movedNodeIndex === -1)  // If it is not between the moved nodes
              pendingInsertions.push(LSNode(newChild, this.isSVG, this.self));
            else { // If it is between the moved nodes
              pendingInsertions.push(movedNodes[movedNodeIndex].updateElement(newChild));
              movedNodes.splice(movedNodeIndex, 1);
            }
          } else // If there are no nodes moved - I must create the new nodes
            pendingInsertions.push(LSNode(newChild, this.isSVG, this.self));
        });
        // Insert pending nodes
        this.insertItemsAt(typedNewJSXElement<ArrayJSXElement>().length - pendingInsertions.length, pendingInsertions);

        // Removing leftover nodes
        this.childrenNodes.splice(typedNewJSXElement<ArrayJSXElement>().length).forEach(x => x.remove());
      }
      this.jsxElement = typedNewJSXElement<ArrayJSXElement>();
      return this;
    }
    return this.replaceWith(newJSXElement);
  }
}