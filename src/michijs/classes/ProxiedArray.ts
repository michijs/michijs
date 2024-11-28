import { create } from "../DOM/create/create";
import type {
  FC,
  ListProps,
  ProxiedArrayInterface,
  SingleJSXElement,
} from "../types";
import { Target } from "./Target";
import { VirtualFragment } from "./VirtualFragment";

export class ProxiedArray<V>
  extends Array<V>
  implements ProxiedArrayInterface<V, V>
{
  #targets = new Array<Target<V>>();

  constructor(...items: V[]) {
    super(...items);
    Object.defineProperty(this, "List", {
      enumerable: false,
      configurable: true,
      value: <const E = FC>(
        { as: asTag, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
        contextElement?: Element,
        contextNamespace?: string,
      ): Node => {
        const el = asTag
          ? (create(
              {
                jsxTag: asTag,
                attrs,
              } as SingleJSXElement,
              contextElement,
              contextNamespace,
            ) as ParentNode)
          : new VirtualFragment();

        const newTarget = new Target(
          el,
          renderItem,
          contextElement,
          contextNamespace,
          useTemplate,
        );

        this.#targets.push(newTarget);

        newTarget.appendItems(this);

        return el.valueOf() as Node;
      },
    });
  }

  List: <const E = FC>(
    { as, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
    contextElement?: Element,
    contextNamespace?: string,
  ) => Node;

  // Critical functions
  override push(...items: V[]): number {
    if (items.length > 0)
      for (const target of this.#targets) target.appendItems(items);
    return super.push(...items);
  }

  $clear(): void {
    for (const target of this.#targets) target.clear();
    this.length = 0;
  }

  $replace(...items: V[]): number {
    if (this.length) {
      for (const target of this.#targets) target.replace(items);
      this.length = items.length;
      items.forEach((x, i) => (this[i] = x));
    } else {
      for (const target of this.#targets) target.appendItems(items);
      super.push(...items);
    }
    return items.length;
  }

  $remove(index: number): number {
    for (const target of this.#targets) target.remove(index);
    super.splice(index, 1);
    return this.length;
  }

  $swap(indexA: number, indexB: number): boolean | void {
    for (const target of this.#targets) target.swap(indexA, indexB);
    [this[indexA], this[indexB]] = [this[indexB], this[indexA]];
    return true;
  }

  override pop(): V | undefined {
    for (const target of this.#targets) target.pop();
    return super.pop();
  }

  override reverse(): V[] {
    for (const target of this.#targets) target.reverse();
    return super.reverse();
  }
  override shift(): V | undefined {
    for (const target of this.#targets) target.shift();
    return super.shift();
  }
  override unshift(...items: V[]): number {
    for (const target of this.#targets) target.prependItems(items);
    return super.unshift(...items);
  }
  override fill(item: V, start?: number, end?: number) {
    for (const target of this.#targets) target.fill(item, start, end);
    super.fill(item, start, end);
    return this;
  }
  override sort(compareFn?: (a: V, b: V) => number) {
    const arrayCopy = [...this];
    const result = super.sort(compareFn);
    if (this.#targets.length > 0) {
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

      for (const target of this.#targets)
        for (const { currentIndex, newIndex } of indexesArray)
          target.swap(currentIndex, newIndex);
    }
    return this;
  }
  override splice(start: number, deleteCount = 0, ...items: V[]): V[] {
    if (start === 0 && deleteCount >= this.length) this.$replace(...items);
    else {
      for (const target of this.#targets)
        target.splice(start, deleteCount, items);
      super.splice(start, deleteCount, ...items);
    }
    return this;
  }
}
