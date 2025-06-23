import { NonProxiedArrayTarget } from "./NonProxiedArrayTarget";

export class Target<V> extends NonProxiedArrayTarget<V> {
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
      this.$remove(k);
      this.insertItemsAt(k, [value]);
      k++;
    }
  }
}
