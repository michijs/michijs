import { FragmentJSXElement, LSCustomElement, ObjectJSXElement } from '../..';
import { getJSXElementType, JSXElementType } from '../typeWards/getJSXElementType';
import { LSNode } from './LSNode';
import { LSVirtualFragmentNode } from './LSVirtualFragmentNode';
export class LSFragmentNode extends LSVirtualFragmentNode<FragmentJSXElement> {
  constructor(jsxElement: FragmentJSXElement, isSVGParam: boolean, self: LSCustomElement) {
    super(jsxElement, isSVGParam, self);
    this.createAndAppend(jsxElement.attrs.children);
  }

  createAndAppend(children: JSX.Element[]) {
    this.childrenNodes = children.map(x => LSNode(x, this.isSVG, this.self));
  }
  updateElement(newJSXElement: JSX.Element) {
    const [type, typedNewJSXElement] = getJSXElementType(newJSXElement);
    if (type === JSXElementType.FRAGMENT && typedNewJSXElement<FragmentJSXElement>().attrs.children.length === this.jsxElement.attrs.children.length) {
      // They must always be the same number of children for the node
      this.childrenNodes = this.childrenNodes.map((childNode, i) => childNode.updateElement(typedNewJSXElement<ObjectJSXElement>().attrs.children[i]));
      this.jsxElement.attrs = typedNewJSXElement<FragmentJSXElement>().attrs;
      return this;
    }
    return this.replaceWith(newJSXElement);
  }
}