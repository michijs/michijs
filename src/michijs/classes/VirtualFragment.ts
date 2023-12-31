import { forEachChildren } from "../DOMDiff/forEachChildren";
import { isElement } from "../typeWards/isElement";

export class VirtualChildNodes
  extends Array<ChildNode>
  implements NodeListOf<ChildNode>
{
  item(index: number) {
    return this.at(index) ?? (null as unknown as ChildNode);
  }
  forEach(
    callbackfn: (value: ChildNode, key: number, parent: any) => void,
    thisArg?: any,
  ): void {
    super.forEach(callbackfn, thisArg);
  }
}

export class VirtualFragment
  implements
    Pick<
      ParentNode,
      | "textContent"
      | "prepend"
      | "append"
      | "replaceChildren"
      | "firstChild"
      | "lastChild"
      | "childNodes"
    >,
    Pick<ChildNode, "remove" | "replaceWith" | "textContent">,
    Pick<Element, "innerHTML">
{
  private startItem = document.createComment("<fragment>");
  private endItem = document.createComment("</fragment>");
  private initialFragment = new DocumentFragment();

  constructor(initialItems: Node[] = []) {
    this.initialFragment.append(this.startItem, ...initialItems, this.endItem);
  }
  replaceWith(...nodes: (string | Node)[]): void {
    if (this.startItem.isConnected) {
      const childNodes = this.childNodes;
      this.startItem.replaceWith(...nodes);
      this.initialFragment.textContent = "";
      this.initialFragment.append(this.startItem, ...childNodes, this.endItem);
    }
  }
  remove(): void {
    if (this.startItem.isConnected) {
      const childNodes = this.childNodes;
      this.initialFragment.textContent = "";
      this.initialFragment.append(this.startItem, ...childNodes, this.endItem);
    }
  }
  prepend(...nodes: (string | Node)[]): void {
    this.startItem?.after(...nodes);
  }
  append(...nodes: (string | Node)[]): void {
    this.endItem?.before(...nodes);
  }
  replaceChildren(...nodes: (string | Node)[]): void {
    forEachChildren(
      this.startItem.nextSibling,
      (node) => {
        node.remove();
      },
      (node) => node !== this.endItem,
    );
    this.append(...nodes);
  }
  get lastChild() {
    const previousSibling = this.endItem.previousSibling;
    return previousSibling !== this.startItem ? previousSibling : null;
  }
  get childNodes() {
    const childNodes = new VirtualChildNodes();
    forEachChildren(
      this.startItem.nextSibling,
      (node) => {
        childNodes.push(node);
      },
      (node) => node !== this.endItem,
    );

    return childNodes;
  }
  get firstChild() {
    const nextSibling = this.startItem.nextSibling;
    return nextSibling !== this.endItem ? nextSibling : null;
  }
  get innerHTML() {
    let innerHTML = "";
    forEachChildren(
      this.startItem.nextSibling,
      (node) =>
        (innerHTML += isElement(node) ? node.outerHTML : node.textContent),
      (node) => node !== this.endItem,
    );
    return innerHTML;
  }
  set innerHTML(content: string) {
    const fragment = document.createRange().createContextualFragment(content);
    this.replaceChildren(fragment);
  }
  get textContent() {
    let textContext = "";
    forEachChildren(
      this.startItem.nextSibling,
      (node) => (textContext += node.textContent),
      (node) => node !== this.endItem,
    );
    return textContext;
  }
  set textContent(content: string) {
    this.replaceChildren(content);
  }

  valueOf(): Node {
    this.remove();
    return this.initialFragment;
  }
}
