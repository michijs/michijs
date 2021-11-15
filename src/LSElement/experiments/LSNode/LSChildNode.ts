import { LSCustomElement } from '../../types';
import { LSNode } from './LSNode';

export abstract class LSChildNode<T extends JSX.Element> {
    self: LSCustomElement;
    jsxElement: T;
    isSVG: boolean;
    public el: ChildNode;

    constructor(jsxElement: T, isSVGParam: boolean, self: LSCustomElement) {
      this.jsxElement = jsxElement;
      this.self = self;
      this.isSVG = isSVGParam;
    }
    replaceWith(newJSXElement: JSX.Element, isSVG = this.isSVG) {
      return this.replaceNodeWith(LSNode(newJSXElement, isSVG, this.self));
    }
    replaceNodeWith(newNode: LSChildNode<JSX.Element>) {
      this.el.replaceWith(newNode.valueOf());
      return newNode;
    }
    remove(){
      this.el.remove();
    }
    after(jsxElement: JSX.Element[]){
      const listToAppend = new Array<Node>();
      const newNodes = jsxElement.map(x => {
        const newNode = LSNode(x, this.isSVG, this.self);
        listToAppend.push(newNode.valueOf());
        return newNode;
      });
      this.el.after(...listToAppend);

      return newNodes;
    }
    afterNodes(node: LSChildNode<JSX.Element>[]){
      this.el.after(...node.map(x => x.valueOf()));
      return node;
    }

    /**
     * 
     * @param newJSXElement 
     * @returns The updated node or a new node replacing it
     */
    updateElement(_newJSXElement: JSX.Element): LSChildNode<any> {
      throw new Error('Method not implemented.');
    }

    valueOf(): Node{
      return this.el;
    }
}