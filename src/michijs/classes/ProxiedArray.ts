import { NonProxiedArray } from "./NonProxiedArray";
import { Target } from "./Target";
import type {
  ElementFactoryType,
  FC,
  ListProps,
  SingleJSXElement,
} from "../types";
import { VirtualFragment } from "./VirtualFragment";
import { CloneFactory, ElementFactory } from "../DOM/create/ElementFactory";

export class ProxiedArray<V> extends NonProxiedArray<V> {
  declare targets: Array<Target<V>>;

  constructor(...items: V[]) {
    super(...items);
    Object.defineProperty(this, "List", {
      enumerable: false,
      configurable: true,
      value: <const E = FC>(
        { as: asTag, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
        factory: ElementFactoryType,
      ): Node => {
        const el: ParentNode | VirtualFragment = asTag
          ? factory.create<ParentNode>({
              jsxTag: asTag,
              attrs,
            } as SingleJSXElement)
          : new VirtualFragment();

        const newTarget = new Target<V>(
          el,
          renderItem,
          useTemplate ? new CloneFactory() : (factory ?? new ElementFactory()),
        );

        this.targets.push(newTarget);

        newTarget.push(this);

        return el.valueOf() as Node;
      },
    });
    Object.defineProperty(this, "targets", {
      enumerable: false,
      configurable: true,
      value: new Array<Target<V>>(),
    });
  }

  override pop(): V | undefined {
    for (const target of this.targets) target.pop();
    return super.pop();
  }

  override reverse(): V[] {
    for (const target of this.targets) target.reverse();
    return super.reverse();
  }

  override shift(): V | undefined {
    for (const target of this.targets) target.shift();
    return super.shift();
  }
  override unshift(...items: V[]): number {
    for (const target of this.targets) target.prependItems(items);
    return super.unshift(...items);
  }
  override fill(item: V, start?: number, end?: number) {
    for (const target of this.targets) target.fill(item, start, end);
    super.fill(item, start, end);
    return this;
  }
  override sort(compareFn?: (a: V, b: V) => number) {
    const arrayCopy = [...this];
    const result = super.sort(compareFn);
    if (this.targets.length > 0) {
      const indexesArray = arrayCopy.reduce(
        (previousValue, currentValue, currentIndex) => {
          const newIndex = result.indexOf(currentValue);
          // To avoid repeated indexes
          if (newIndex > currentIndex) {
            previousValue.push({
              currentIndex,
              newIndex,
            });
          }
          return previousValue;
        },
        new Array<{ currentIndex: number; newIndex: number }>(),
      );

      for (const target of this.targets)
        for (const { currentIndex, newIndex } of indexesArray)
          target.$swap(currentIndex, newIndex);
    }
    return this;
  }
  override splice(start: number, deleteCount = 0, ...items: V[]): V[] {
    if (start === 0 && deleteCount >= this.length) this.$replace(...items);
    else {
      for (const target of this.targets)
        target.splice(start, deleteCount, items);
      super.splice(start, deleteCount, ...items);
    }
    return this;
  }
}
