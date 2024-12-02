import { create } from "../DOM/create/create";
import { clone } from "../DOM/clone/clone";
import type { FC } from "../types";
import type { VirtualFragment } from "./VirtualFragment";

export class Target<V> {
  private element: VirtualFragment | ParentNode;
  private renderItem: FC<V>;
  contextElement?: Element;
  contextNamespace?: string;
  template?: Node;

  constructor(
    element: VirtualFragment | ParentNode,
    renderItem: FC<V>,
    contextElement?: Element,
    contextNamespace?: string,
    useTemplate?: boolean,
  ) {
    this.element = element;
    this.renderItem = renderItem;
    this.contextElement = contextElement;
    this.contextNamespace = contextNamespace;
    this.create = useTemplate
      ? (value: V) => {
          if (!this.template)
            this.template = create(
              this.renderItem(value),
              this.contextElement,
              this.contextNamespace,
            );
          return clone(
            this.template,
            this.renderItem(value),
            this.contextElement,
          );
        }
      : (value: V) =>
          create(
            this.renderItem(value),
            this.contextElement,
            this.contextNamespace,
          );
  }

  clear(): void {
    this.element.textContent = "";
  }

  create: (value: V) => Node;

  replace(items: V[]): void {
    // A little better than replaceChildren
    this.clear();
    this.appendItems(items);
  }

  // Critical functions
  appendItem(item: V): void {
    this.element.appendChild(this.create(item));
  }
  appendItems(items: V[]): void {
    items.forEach(this.appendItem, this);
  }

  remove(index: number): void {
    this.element.childNodes[index]?.remove();
  }

  swap(indexA: number, indexB: number): void {
    if (indexA === indexB) return;

    if (indexA > indexB) [indexA, indexB] = [indexB, indexA];

    const node1 = this.element.childNodes[indexA];
    const node2 = this.element.childNodes[indexB];

    if (!node2) throw `Index ${indexB} is out of bound`;

    const node2NextSibling = node2.nextSibling;
    // Insert `node2` before `node1`, then reinsert `node1` in `node2`'s position
    this.element.insertBefore(node2, node1);
    if (node2NextSibling) this.element.insertBefore(node1, node2NextSibling);
    else this.element.appendChild(node1); // If no nextSibling, append node1 at the end
  }

  replaceNode(el: ChildNode, value: V): void {
    el.replaceWith(this.create(value));
  }

  pop(): void {
    this.element.lastChild?.remove();
  }

  shift(): void {
    this.element.firstChild?.remove();
  }

  insertItemsAt(i: number, items: V[]): void {
    this.insertChildNodesAt(i, ...items.map(this.create));
  }

  prependItems(items: V[]): void {
    this.element.prepend(...items.map(this.create));
  }

  reverse(): void {
    this.element.replaceChildren(
      ...Array.from(this.element.childNodes).reverse(),
    );
  }

  insertChildNodesAt(i: number, ...childNodes: Node[]): void {
    if (i === 0) this.element.prepend(...childNodes);
    else this.element.childNodes[i - 1].after(...childNodes);
  }
  splice(start: number, deleteCount: number, items: V[]): void {
    const len = this.element.childNodes.length;
    const relativeStart = start >> 0;
    const k =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);

    let item: ChildNode | null = this.element.childNodes[k],
      count = 0;
    while (item && count < deleteCount) {
      const nextSibling = item.nextSibling;
      item.remove();
      item = nextSibling;
      count++;
    }
    if (items.length > 0) this.insertItemsAt(k, items);
  }
  fill(value: V, start = 0, end?: number): void {
    const len = this.element.childNodes.length;
    const relativeStart = start >> 0;

    let k =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);

    const relativeEnd = end === undefined ? len : end >> 0;

    const final =
      relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len);

    while (k < final) {
      this.remove(k);
      this.insertItemsAt(k, [value]);
      k++;
    }
  }
}
