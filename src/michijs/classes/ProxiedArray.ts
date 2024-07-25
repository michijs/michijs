import { create } from "../DOMDiff/create";
import type {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  FC,
  MutableArrayProperties,
  ProxiedArrayInterface,
  SingleJSXElement,
} from "../types";
import { Target } from "./Target";
import { VirtualFragment } from "./VirtualFragment";
import { ProxiedValue } from "./ProxiedValue";

export class ProxiedArray<V>
  extends ProxiedValue<V[]>
  implements ProxiedArrayInterface<V, V>, Pick<Array<V>, MutableArrayProperties>
{
  private targets = new Array<Target<V>>();
  List = <const E = FC>(
    {
      as: asTag,
      renderItem,
      ...attrs
    }: ExtendableComponentWithoutChildren<E> & {
      renderItem: FC<V>;
    },
    context?: CreateOptions,
  ): Node => {
    const el = asTag
      ? (create({
          jsxTag: asTag,
          attrs,
        } as SingleJSXElement) as ParentNode)
      : new VirtualFragment();

    const newTarget = new Target(el, renderItem, context);

    this.targets.push(newTarget);

    newTarget.appendItems(...this.$value);

    return el.valueOf() as Node;
  };

  $clear(): void {
    this.targets.forEach((target) => target.clear());
    this.$value = [];
    this.notifyCurrentValue();
  }

  $replace(...items: V[]): number {
    this.targets.forEach((target) => target.replace(...items));
    this.$value = items;
    this.notifyCurrentValue();
    return items.length;
  }

  $remove(index: number): number {
    this.$value = this.$value.filter((_x, i) => i !== index);
    this.targets.forEach((target) => target.remove(index));
    this.notifyCurrentValue();
    return this.$value.length;
  }

  $swap(indexA: number, indexB: number): void {
    if (this.$value.length > indexA && this.$value.length > indexB) {
      this.targets.forEach((target) => target.swap(indexA, indexB));
      [this.$value[indexA], this.$value[indexB]] = [
        this.$value[indexB],
        this.$value[indexA],
      ];
      this.notifyCurrentValue();
    }
  }

  pop(): V | undefined {
    this.targets.forEach((target) => target.pop());
    const result = this.$value.pop();
    this.notifyCurrentValue();

    return result;
  }

  push(...items: V[]): number {
    if (items.length > 0)
      this.targets.forEach((target) => target.appendItems(...items));
    const result = this.$value?.push(...items);

    this.notifyCurrentValue();
    return result;
  }
  reverse(): V[] {
    this.targets.forEach((target) => target.reverse());
    const result = this.$value.reverse();

    this.notifyCurrentValue();
    return result;
  }
  shift(): V | undefined {
    this.targets.forEach((target) => target.shift());
    const result = this.$value.shift();
    this.notifyCurrentValue();
    return result;
  }
  unshift(...items: V[]): number {
    this.targets.forEach((target) => target.prependItems(...items));
    const result = this.$value.unshift(...items);
    this.notifyCurrentValue();
    return result;
  }
  fill(item: V, start?: number, end?: number): V[] {
    this.targets.forEach((target) => target.fill(item, start, end));
    const result = this.$value.fill(item, start, end);
    this.notifyCurrentValue();
    return result;
  }
  sort(compareFn?: (a: V, b: V) => number): V[] {
    const arrayCopy = [...this.$value];
    const result = this.$value.sort(compareFn);
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
      this.targets.forEach((target) => {
        indexesArray.forEach(({ currentIndex, newIndex }) => {
          target.swap(currentIndex, newIndex);
        });
      });
    }
    return result;
  }
  splice(start: number, deleteCount = 0, ...items: V[]): V[] {
    if (start === 0 && deleteCount >= this.$value.length)
      this.$replace(...items);
    else {
      this.targets.forEach((target) =>
        target.splice(start, deleteCount, ...items),
      );
      this.$value.splice(start, deleteCount, ...items);
    }
    return this.$value;
  }
}
