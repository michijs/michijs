import {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  Subscription,
  ProxiedValue,
  SingleJSXElement,
  ProxiedArrayInterface,
  MutableArrayProperties,
  NonProxiedFC,
} from "../..";
import { create } from "../DOMDiff";
// import { ListElement } from "../components/FragmentAndList";
import { Target } from "./Target";
import { VirtualFragment } from "./VirtualFragment";

export class ProxiedArray<V>
  extends ProxiedValue<V[]>
  implements ProxiedArrayInterface<V, V>, Pick<Array<V>, MutableArrayProperties>
{
  private targets = new Array<Target<V>>();
  constructor(initialData: V[], initialObservers?: Subscription<V[]>[]) {
    super(initialData, initialObservers);
  }
  List = <const E = NonProxiedFC>(
    {
      as: asTag,
      renderItem,
      ...attrs
    }: ExtendableComponentWithoutChildren<E> & {
      renderItem: NonProxiedFC<V>;
    },
    context: CreateOptions,
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

    return el as Node;
  };

  $clear() {
    this.targets.forEach((target) => target.clear());
    this.$value = [];
    this.notifyCurrentValue();
  }

  $replace(...items: V[]) {
    this.targets.forEach((target) => target.replace(...items));
    this.$value = items;
    this.notifyCurrentValue();
    return items.length;
  }

  $remove(index: number) {
    this.$value = this.$value.filter((_x, i) => i !== index);
    this.targets.forEach((target) => target.remove(index));
    this.notifyCurrentValue();
    return this.$value.length;
  }

  $swap(indexA: number, indexB: number) {
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
  reverse() {
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

  // sort(compareFn?: (a: T, b: T) => number): this {
  //     throw new Error('Method not implemented.');
  // }
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place.
   * Only positive values allowed
   */
  // splice(start: number, deleteCount: number, ...items: T[]) {
  //   if (start >= 0 && deleteCount >= 0)
  //     if (start === 0 && deleteCount >= this.data.length)
  //       this.clear();
  //     else {
  //       this.targets.forEach(target => {
  //         let item = target.element.childNodes.item(start),
  //           count = 0;
  //         while (item && count < deleteCount) {
  //           const nextSibling = item.nextSibling;
  //           item.remove();
  //           item = nextSibling;
  //           count++;
  //         }
  //         if (items.length > 0)
  //           target.insertItemsAt(start, ...items);
  //       });
  //       this.data.splice(start, deleteCount, ...items);
  //     }
  // }
}
