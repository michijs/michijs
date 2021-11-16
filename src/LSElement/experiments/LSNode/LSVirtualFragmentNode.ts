import { LSCustomElement } from '../../..';
import { LSChildNode } from './LSChildNode';
import { LSEmptyNode } from './LSEmptyNode';
import { LSParentNode } from './LSParentNode';
export abstract class LSVirtualFragmentNode<T extends JSX.Element> implements LSParentNode<T> {
    protected pivotNode: LSEmptyNode;
    
    self: LSCustomElement;
    jsxElement: T;
    isSVG: boolean;
    el: ParentNode & ChildNode;
    childrenNodes: LSChildNode<JSX.Element>[];
    constructor(jsxElement: T, isSVGParam: boolean, self: LSCustomElement) {
      this.jsxElement = jsxElement;
      this.self = self;
      this.isSVG = isSVGParam;
      this.pivotNode = new LSEmptyNode(false, this.isSVG, this.self);
    }
    createAndAppend(_children: JSX.Element[]): void {
      throw new Error('Method not implemented.');
    }
    updateElement(_newJSXElement: JSX.Element): LSChildNode<any> {
      throw new Error('Method not implemented.');
    }
    replaceWith(newJSXElement: JSX.Element) {
      this.clear();
      return this.pivotNode.replaceWith(newJSXElement);
    }
    replaceNodeWith(newNode: LSChildNode<JSX.Element>) {
      this.clear();
      return this.pivotNode.replaceNodeWith(newNode);
    }
    clear(): void {
      this.childrenNodes.forEach(x => x.remove());
      this.childrenNodes = [];
    }
    remove(): void {
      this.pivotNode.remove();
      this.childrenNodes.forEach(x => x.remove());
    }
    after(jsxElement: JSX.Element[]) {
      const mountPoint = this.childrenNodes.length === 0 ? this.pivotNode : this.childrenNodes[this.childrenNodes.length - 1];
      return mountPoint.after(jsxElement);
    }
    afterNodes(nodes: LSChildNode<JSX.Element>[]) {
      const mountPoint = this.childrenNodes.length === 0 ? this.pivotNode : this.childrenNodes[this.childrenNodes.length - 1];
      return mountPoint.afterNodes(nodes);
    }
    valueOf() {
      const el = document.createDocumentFragment();
      el.append(this.pivotNode.valueOf(), ...this.childrenNodes.map(x => x.valueOf()));

      return el;
    }
}