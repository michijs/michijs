import { forEachChildren } from "../DOM/forEachChildren";
import { isElement } from "../typeWards/isElement";

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
      | "appendChild"
      | "insertBefore"
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
  // TODO: Not tested
  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (!child || child === this.endItem) {
      this.appendChild(node);
    } else {
      forEachChildren(
        this.startItem.nextSibling,
        (currentNode) => {
          if (currentNode === child) {
            child.parentNode?.insertBefore(node, child);
            return true;
          }
        },
        (currentNode) => currentNode === this.endItem,
      );
    }
    return node;
  }
  appendChild<T extends Node>(node: T): T {
    this.append(node);
    return node;
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
      (node) => node === this.endItem,
    );
    this.append(...nodes);
  }
  get lastChild(): ChildNode | null {
    const previousSibling = this.endItem.previousSibling;
    return previousSibling !== this.startItem ? previousSibling : null;
  }
  get childNodes(): ChildNode[] {
    const childNodes: ChildNode[] = [];
    forEachChildren(
      this.startItem.nextSibling,
      (node) => {
        childNodes.push(node);
      },
      (node) => node === this.endItem,
    );

    return childNodes;
  }
  get firstChild(): ChildNode | null {
    const nextSibling = this.startItem.nextSibling;
    return nextSibling !== this.endItem ? nextSibling : null;
  }
  get innerHTML() {
    let innerHTML = "";
    forEachChildren(
      this.startItem.nextSibling,
      (node) =>
        (innerHTML += isElement(node) ? node.outerHTML : node.textContent),
      (node) => node === this.endItem,
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
      (node) => node === this.endItem,
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
