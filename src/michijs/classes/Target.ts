import { create } from "../DOMDiff/create";
import type { FC } from "../types";
import type { VirtualFragment } from "./VirtualFragment";

export class Target<V> {
  private element: VirtualFragment | ParentNode;
  private renderItem: FC<V>;
  contextElement?: Element;
  contextNamespace?: string;
  constructor(
    element: VirtualFragment | ParentNode,
    renderItem: FC<V>,
    contextElement?: Element,
    contextNamespace?: string,
  ) {
    this.element = element;
    this.renderItem = renderItem;
    this.contextElement = contextElement;
    this.contextNamespace = contextNamespace;
  }

  clear(): void {
    this.element.textContent = "";
  }

  createSingleItem(value: V): Node {
    return create(
      this.renderItem(value),
      this.contextElement,
      this.contextNamespace,
    );
  }
  create(...value: V[]): Node[] {
    return value.map((x) => this.createSingleItem(x));
  }

  replace(...items: V[]): void {
    // A little better than replaceChildren
    this.clear();
    this.appendItems(...items);
  }

  replaceNode(el: ChildNode, value: V): void {
    const newNode = this.createSingleItem(value);
    el.replaceWith(newNode);
  }

  pop(): void {
    this.element.lastChild?.remove();
  }

  shift(): void {
    this.element.firstChild?.remove();
  }

  remove(index: number): void {
    this.element.childNodes[index]?.remove();
  }

  insertItemsAt(i: number, ...items: V[]): void {
    const renderResult = this.create(...items);

    this.insertChildNodesAt(i, ...renderResult);
  }

  prependItems(...items: V[]): void {
    const renderResult = this.create(...items);

    this.element.prepend(...renderResult);
  }

  appendItems(...items: V[]): void {
    const renderResult = this.create(...items);

    this.element.append(...renderResult);
  }

  reverse(): void {
    this.element.replaceChildren(
      ...Array.from(this.element.childNodes).reverse(),
    );
  }

  swap(indexA: number, indexB: number): void {
    const elA = this.element.childNodes[indexA];
    const elB = this.element.childNodes[indexB];
    if (elA && elB) {
      const previousSiblingA = elA.previousSibling;
      if (previousSiblingA) {
        if (previousSiblingA === elB)
          // if [B, A] then move B after A
          elA.after(elB);
        else {
          //if [B, ... , previousSiblingA, A] then replace B with A and move B after previousSiblingA
          elB.replaceWith(elA);
          previousSiblingA.after(elB);
        }
      } else {
        const nextSiblingA = elA.nextSibling;
        if (nextSiblingA === elB)
          // if [A, B] then move A after B
          elB.after(elA);
        else {
          //if [A, nextSiblingA, ... , B] then replace B with A and move B before nextSiblingA
          elB.replaceWith(elA);
          nextSiblingA?.before(elB);
        }
      }
    }
    // [this.data[indexA], this.data[indexB]] = [this.data[indexB], this.data[indexA]];
    // const [greatestValue, lowestValue] = indexA > indexB ? [indexA, indexB] : [indexB, indexA];
    // this.targets.forEach(target => {
    //   const greatestValueNode = target.element.childNodes.item(greatestValue);
    //   const lowestValueNode = target.element.childNodes.item(lowestValue);
    //   const greatestValueNextNode = greatestValueNode.nextSibling;
    //   const lowestValueNextNode = lowestValueNode.nextSibling;
    //   target.element.insertBefore(greatestValueNode, lowestValueNextNode);
    //   target.element.insertBefore(lowestValueNode, greatestValueNextNode);
    // });
  }

  insertChildNodesAt(i: number, ...childNodes: Node[]): void {
    if (i === 0) this.element.prepend(...childNodes);
    else this.element.childNodes[i - 1].after(...childNodes);
  }
  splice(start: number, deleteCount: number, ...items: V[]): void {
    const len = this.element.childNodes.length;
    const relativeStart = start >> 0;
    const k =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);

    let item: ChildNode | null = this.element.childNodes.item(k),
      count = 0;
    while (item && count < deleteCount) {
      const nextSibling = item.nextSibling;
      item.remove();
      item = nextSibling;
      count++;
    }
    if (items.length > 0) this.insertItemsAt(k, ...items);
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
      this.insertItemsAt(k, value);
      k++;
    }
  }
}
