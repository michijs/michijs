import { forEachChildren } from "../DOM/forEachChildren";

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
    Pick<ChildNode, "remove" | "textContent">
{
  private startItem = document.createComment("<fragment>");
  private endItem = document.createComment("</fragment>");
  private initialFragment = new DocumentFragment();

  constructor(initialItems: Node[] = []) {
    this.initialFragment.append(this.startItem, ...initialItems, this.endItem);
  }

  private processChildren(callback: (node: ChildNode) => void): void {
    forEachChildren(
      this.startItem.nextSibling,
      callback,
      (node) => node === this.endItem
    );
  }

  private updateInitialFragment(): void {
    const childNodes = this.childNodes;
    this.initialFragment.textContent = "";
    this.initialFragment.append(this.startItem, ...childNodes, this.endItem);
  }

  insertBefore<T extends Node>(node: T, child: Node | null): T {
    if (!child || child === this.endItem)
      return this.appendChild(node);
    this.processChildren((currentNode) => {
      if (currentNode === child) {
        child.parentNode?.insertBefore(node, child);
        return true;
      }
    });
    return node;
  }

  appendChild<T extends Node>(node: T): T {
    this.append(node);
    return node;
  }

  remove(): void {
    if (this.startItem.isConnected)
      this.updateInitialFragment();
  }

  prepend(...nodes: (string | Node)[]): void {
    this.startItem.after(...nodes);
  }

  append(...nodes: (string | Node)[]): void {
    this.endItem.before(...nodes);
  }

  replaceChildren(...nodes: (string | Node)[]): void {
    this.processChildren((node) => node.remove());
    this.append(...nodes);
  }

  get lastChild(): ChildNode | null {
    const previousSibling = this.endItem.previousSibling;
    return previousSibling !== this.startItem ? previousSibling : null;
  }

  get childNodes(): ChildNode[] {
    const childNodes: ChildNode[] = [];
    this.processChildren((node) => childNodes.push(node));
    return childNodes;
  }

  get firstChild(): ChildNode | null {
    const nextSibling = this.startItem.nextSibling;
    return nextSibling !== this.endItem ? nextSibling : null;
  }

  get textContent() {
    let textContent = "";
    this.processChildren((node) => (textContent += node.textContent));
    return textContent;
  }

  set textContent(content: string) {
    this.replaceChildren(content);
  }

  valueOf(): Node {
    this.remove();
    return this.initialFragment;
  }
}
