import { AnyObject, ArrayJSXElement, ClassJSXElement, FunctionJSXElement, LSCustomElement, ObjectJSXElement } from '../../..';
import { getJSXElementType, JSXElementType } from '../../typeWards/getJSXElementType';
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
  insertItem(i: number, node: LSChildNode<JSX.Element>) {
    if (this.childrenNodes.length > i) {
      if (i !== 0) {
        this.childrenNodes[i - 1].afterNodes([node]);
        this.childrenNodes.splice(i, 0, node);
      } else {
        this.pivotNode.afterNodes([node]);
        this.childrenNodes.unshift(node);
      }
    } else {
      this.childrenNodes.push(...this.afterNodes([node]));
    }
    return node;
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.ARRAY) {
      const movedNodes = new Array<{ node: LSChildNode<JSX.Element>, jsx: AnyObject | ObjectJSXElement | FunctionJSXElement | ClassJSXElement }>();
      if (typedNewJSXElement<ArrayJSXElement>().length === 0)//No new elements - should remove every element
        this.clear();
      else if (this.childrenNodes.length === 0)//Only new elements
        this.childrenNodes.push(...this.after(typedNewJSXElement<ArrayJSXElement>()));
      else { //Both have new / changed elements
        for (let i = 0; i < this.childrenNodes.length && i < typedNewJSXElement<ArrayJSXElement>().length; i++) {
          const newChild = typedNewJSXElement<ArrayJSXElement>()[i];
          const oldChild = this.childrenNodes[i].jsxElement;
          if (typeof newChild === 'object' && 'key' in newChild) {
            if (typeof oldChild === 'object' && 'key' in oldChild) {
              if (newChild.key === oldChild.key)// Same node
                this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
              else {// Different node - probably moved
                const movedNodeIndex = movedNodes.findIndex(x => x.jsx.key === newChild.key);
                if (movedNodeIndex === -1) {
                  movedNodes.push({ node: this.childrenNodes[i], jsx: oldChild });
                  this.removeItem(i);
                  const movedNodeIndex = this.childrenNodes.slice(i).findIndex(x =>
                    typeof x.jsxElement === 'object' && 'key' in x.jsxElement && x.jsxElement.key === newChild.key
                  );
                  if (movedNodeIndex !== -1) {
                    const finalMovedNodeIndex = movedNodeIndex + i;
                    if (finalMovedNodeIndex === i) {
                      this.childrenNodes[i] = this.childrenNodes[finalMovedNodeIndex].updateElement(newChild);
                    } else {
                      const movedNode = this.childrenNodes[finalMovedNodeIndex];
                      this.removeItem(finalMovedNodeIndex);
                      this.insertItem(i, movedNode).updateElement(newChild);
                    }
                  } else {
                    this.insertItem(i, LSNode(newChild, this.isSVG, this.self));
                    // this.childrenNodes[i] = this.childrenNodes[i].replaceWith(newChild);
                  }
                } else {
                  const movedNode = movedNodes[movedNodeIndex].node;
                  movedNodes.splice(movedNodeIndex, 1);
                  this.insertItem(i, movedNode).updateElement(newChild);
                }
              }
            }
          } else if (typeof oldChild === 'object' && 'key' in oldChild) { // Different node - probably moved / replaced with a node without key
            // There is no need to remove it from the dom as it has already been replaced
            movedNodes.push({ node: this.childrenNodes[i], jsx: oldChild });
            this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
          } else// It is assumed to be the same node - Case in which it is a primitive node / empty / without key
            this.childrenNodes[i] = this.childrenNodes[i].updateElement(newChild);
        }
        // New nodes
        if (movedNodes.length > 0) {
          const nodes = typedNewJSXElement<ArrayJSXElement>().slice(this.jsxElement.length).map(newChild => {
            const movedNode = typeof newChild === 'object' && 'key' in newChild ? movedNodes.find(x => x.jsx.key === newChild.key)?.node : undefined;
            if (movedNode) {
              movedNode.updateElement(newChild);
              return movedNode;
            } return LSNode(newChild, this.isSVG, this.self);
          });
          this.childrenNodes.push(...this.afterNodes(nodes));
        } else
          this.childrenNodes.push(...this.after(typedNewJSXElement<ArrayJSXElement>().slice(this.jsxElement.length)));

        // Removing lefover nodes
        this.childrenNodes.splice(typedNewJSXElement<ArrayJSXElement>().length).forEach(x => x.remove());
      }
      this.jsxElement = typedNewJSXElement<ArrayJSXElement>();
      return this;
    }
    return this.replaceWith(newJSXElement);
  }
}