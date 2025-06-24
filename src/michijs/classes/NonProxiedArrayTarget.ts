import type { ElementFactoryType, FC } from "../types";
import type { VirtualFragment } from "./VirtualFragment";

export class NonProxiedArrayTarget<V> {
  protected element: VirtualFragment | ParentNode;
  private factory: ElementFactoryType;
  private renderItem: FC<V>;

  constructor(
    element: VirtualFragment | ParentNode,
    renderItem: FC<V>,
    factory: ElementFactoryType,
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

    const node1 = this.element.childNodes[indexA],
      node2 = this.element.childNodes[indexB],
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
}
