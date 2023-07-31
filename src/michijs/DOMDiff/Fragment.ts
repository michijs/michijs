import { forEachChildren } from "./forEachChildren";

export class FragmentChildNodes extends Array<ChildNode> implements NodeListOf<ChildNode> {
  item(index: number) {
    return this.at(index) ?? null as unknown as ChildNode 
  }
  forEach(callbackfn: (value: ChildNode, key: number, parent: any) => void, thisArg?: any): void {
    super.forEach(callbackfn, thisArg)
  }
}

export class Fragment implements Pick<Node, 'textContent'>, Pick<ParentNode, 'prepend' | 'append' | 'replaceChildren' | 'lastChild' | 'childNodes'>, Pick<ChildNode, 'replaceWith'> {
  private startItem = document.createComment('fs');
  private endItem = document.createComment('fe');

  constructor(private initialItems: Fragment[] = []) {
  }
  replaceWith(...nodes: (string | Node)[]): void {
    this.replaceChildren(...nodes);
    this.startItem.remove();
    this.endItem.remove();
  }
  prepend(...nodes: (string | Node)[]): void {
    this.firstChild?.after(...nodes);
  }
  append(...nodes: (string | Node)[]): void {
    this.lastChild?.before(...nodes);
  }
  replaceChildren(...nodes: (string | Node)[]): void {
    forEachChildren(
      this.startItem.nextSibling,
      (node) => {
        node.remove();
      },
      (node) => node !== this.endItem
    )
    this.startItem?.after(...nodes);
  }
  get lastChild() {
    const previousSibling = this.endItem.previousSibling;
    return previousSibling !== this.startItem ? previousSibling : null;
  }
  get childNodes() {
    const childNodes = new FragmentChildNodes();
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
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    this.replaceChildren(doc)
  }

  valueOf(): Node {
    const fragment = new DocumentFragment();
    fragment.append(this.startItem, ...this.initialItems.map(x => x.valueOf()), this.endItem);
    return fragment;
  }
}
