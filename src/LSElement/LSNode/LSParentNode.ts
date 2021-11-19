import { LSCustomElement } from '../types';
import { LSChildNode } from './LSChildNode';
import { LSNode } from './LSNode';

export abstract class LSParentNode<T extends JSX.Element> extends LSChildNode<T> {
    el: ParentNode & ChildNode;
    childrenNodes = new Array<LSChildNode<JSX.Element>>();

    constructor(jsxElement: T, isSVGParam: boolean, self: LSCustomElement) {
      super(jsxElement, isSVGParam, self);
    }
    /**
     * 
     * @param children 
     * @returns Create and add a set of nodes to the node
     */
    createAndAppend(children: JSX.Element[]) {
      const childrenElements = new Array<Node>();
      this.childrenNodes = children.map(x => {
        const node = LSNode(x, this.isSVG, this.self);
        childrenElements.push(node.valueOf());
        return node;
      });

      this.el.append(...childrenElements);
    }
}