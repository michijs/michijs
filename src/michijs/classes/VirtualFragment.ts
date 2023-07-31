import { forEachChildren } from "../DOMDiff/forEachChildren";

export class VirtualChildNodes extends Array<ChildNode> implements NodeListOf<ChildNode> {
  item(index: number) {
    return this.at(index) ?? null as unknown as ChildNode
  }
  forEach(callbackfn: (value: ChildNode, key: number, parent: any) => void, thisArg?: any): void {
    super.forEach(callbackfn, thisArg)
  }
}

export class VirtualFragment implements Pick<ParentNode, 'textContent'| 'prepend' | 'append' | 'replaceChildren' | 'firstChild' | 'lastChild' | 'childNodes'>, Pick<ChildNode, 'replaceWith'> {
  private startItem = document.createComment('<fragment>');
  private endItem = document.createComment('</fragment>');
  private initialFragment = new DocumentFragment();

  constructor(initialItems: Node[] = []) {
    this.initialFragment.append(this.startItem, ...initialItems, this.endItem)
  }
  replaceWith(...nodes: (string | Node)[]): void {
    this.replaceChildren(...nodes);
    this.startItem.remove();
    this.endItem.remove();
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
      (node) => node !== this.endItem
    )
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
      (node) => node !== this.endItem
    )

    return childNodes;
  }
  get firstChild() {
    const nextSibling = this.endItem.nextSibling;
    return nextSibling !== this.endItem ? nextSibling : null;
  }
  get textContent() {
    let textContext = '';
    forEachChildren(
      this.startItem.nextSibling,
      (node) => {
        textContext += node.textContent;
      },
      (node) => node !== this.endItem
    )
    return textContext;
  }
  set textContent(content: string) {
    const fragment = document.createRange().createContextualFragment(content);
    this.replaceChildren(fragment)
  }

  valueOf(): Node {
    return this.initialFragment;
  }
}
