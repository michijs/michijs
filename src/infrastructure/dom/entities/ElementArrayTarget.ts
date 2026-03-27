import type { VirtualFragmentPort } from "@domain";
import type { TargetPort, ElementFactoryPort } from "@ports";
import type { FC, SingleJSXElement } from "../rendering/types";

export class ElementArrayTarget<V> implements TargetPort<V, Node> {
  protected element: VirtualFragmentPort | ParentNode;
  private factory: ElementFactoryPort<Element, SingleJSXElement>;
  private renderItem: FC<V>;

  constructor(
    element: VirtualFragmentPort | ParentNode,
    renderItem: FC<V>,
    factory: ElementFactoryPort<Element, SingleJSXElement>,
  ) {
    this.element = element;
    this.renderItem = renderItem;
    this.factory = factory;
  }
  create(item: V) {
    return this.factory.create(this.renderItem(item, this.factory));
  }

  $clear(): void {
    this.element.textContent = "";
  }

  $replace(items: V[]): void {
    // A little better than replaceChildren
    this.$clear();
    this.push(items);
  }

  // Critical functions
  private appendItem(item: V): void {
    this.element.appendChild(this.create(item));
  }

  push(items: V[]): void {
    items.forEach(this.appendItem, this);
  }

  $remove(index: number): void {
    this.element.childNodes[index]?.remove();
  }

  $swap(indexA: number, indexB: number): void {
    removeSwapValidations: {
      if (indexA === indexB) return;

      if (indexA > indexB) [indexA, indexB] = [indexB, indexA];

      if (indexB > this.element.childElementCount)
        throw `Index ${indexB} is out of bound`;
    }

    const node1 = this.element.childNodes[indexA]!,
      node2 = this.element.childNodes[indexB]!,
      node1NextSibling = node1.nextSibling;
    removeSwapValidations: {
      if (node1NextSibling === node2) {
        node1NextSibling.after(node1);
        return;
      }
    }

    this.element.insertBefore(node1, node2),
      this.element.insertBefore(node2, node1NextSibling);
  }

  pop(): void {
    this.element.lastChild?.remove();
  }

  shift(): void {
    this.element.firstChild?.remove();
  }

  insertItemsAt(i: number, items: V[]): void {
    this.insertChildNodesAt(i, ...items.map(this.create, this));
  }

  prependItems(items: V[]): void {
    this.element.prepend(...items.map(this.create, this));
  }

  reverse(): void {
    this.element.replaceChildren(
      ...Array.from(this.element.childNodes).reverse(),
    );
  }

  insertChildNodesAt(i: number, ...childNodes: Node[]): void {
    if (i === 0) this.element.prepend(...childNodes);
    // It should throw an error if its undefined
    // @ts-expect-error
    else this.element.childNodes[i - 1].after(...childNodes);
  }

  splice(start: number, deleteCount: number, items: V[]): void {
    const len = this.element.childNodes.length;
    const relativeStart = start >> 0;
    const k =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);

    let item: ChildNode | undefined | null = this.element.childNodes[k],
      count = 0;
    while (item && count < deleteCount) {
      const nextSibling: ChildNode | null = item.nextSibling;
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
      this.$remove(k);
      this.insertItemsAt(k, [value]);
      k++;
    }
  }
}
