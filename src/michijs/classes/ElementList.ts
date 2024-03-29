import { DeepReadonly, GetElementProps, ObjectJSXElement } from "../..";
import { ListElement } from "../components/FragmentAndList";
import { ListAttrs } from "../components/List";
import { Target } from "./Target";

export type ElementListInterface<V> = Pick<
  V[],
  "push" | "pop" | "reverse" | "shift" | "unshift"
> & {
  /**
   * Removes all the list elements
   */
  clear();
  /**
   * Replace all the list elements
   */
  replace(...items: V[]);
  /**
   * Removes an item
   */
  remove(id: number);
  /**
   * Updates an item
   */
  update(id: number, callback: (oldValue: V) => V);
};

export type RenderFunction<V> = (item: V) => JSX.Element;

export class ElementList<V> implements ElementListInterface<V> {
  private targets = new Array<Target<V>>();
  private data: V[];
  constructor(...initialData: V[]) {
    this.data = initialData;
  }
  /**
   * Is a proxy that allows you to avoid using dom diff algorithms to render lists.
   * This allows it to have a performance close to vanilla js.
   * An operation on the data implies an operation on the associated elements.
   */
  List = <const E = typeof ListElement>({
    as,
    renderItem,
    ...attrs
  }: { as?: E } & Omit<GetElementProps<E>, "children"> & {
      renderItem: RenderFunction<V>;
    }) => {
    return {
      tag: as ?? ListElement.tag,
      attrs: {
        ...attrs,
        children: [],
        $doNotTouchChildren: true,
        $oncreated: (el: Element, isSVG, isMATHML, context) => {
          const target = new Target<V>(
            el,
            renderItem,
            isSVG,
            isMATHML,
            context,
          );
          if (this.data.length > 0) target.appendItems(...this.data);
          this.targets.push(target);
        },
      },
    } as ObjectJSXElement;
  };

  clear() {
    this.targets.forEach((target) => target.clear());
    this.data = [];
  }

  replace(...items: V[]) {
    this.targets.forEach((target) => target.replace(...items));
    this.data = items;
  }

  remove(index: number) {
    this.data = this.data.filter((_x, i) => i !== index);
    this.targets.forEach((target) => target.remove(index));
  }

  update(index: number, callback: (oldValue: V) => V) {
    if (index < this.data.length) {
      const oldValue = this.data[index];
      const newValue = callback(oldValue);
      this.data[index] = newValue;
      this.targets.forEach((target) => target.update(index, newValue));
    }
  }

  updateAll(callback: (oldValue: V) => V) {
    this.data.forEach((oldValue, index) => {
      const newValue = callback(oldValue);
      this.data[index] = newValue;
      this.targets.forEach((target) => target.update(index, newValue));
    });
  }

  pop(): V | undefined {
    this.targets.forEach((target) => target.pop());
    return this.data.pop();
  }

  push(...items: V[]): number {
    if (items.length > 0)
      this.targets.forEach((target) => target.appendItems(...items));
    this.data?.push(...items);
    return this.data.length;
  }
  reverse() {
    this.targets.forEach((target) => target.reverse());
    return this.data.reverse();
  }
  shift(): V | undefined {
    this.targets.forEach((target) => target.shift());
    return this.data.shift();
  }
  unshift(...items: V[]): number {
    this.targets.forEach((target) => target.prependItems(...items));
    return this.data.unshift(...items);
  }
  swap(indexA: number, indexB: number) {
    if (this.data.length > indexA && this.data.length > indexB) {
      this.targets.forEach((target) => target.swap(indexA, indexB));
      [this.data[indexA], this.data[indexB]] = [
        this.data[indexB],
        this.data[indexA],
      ];
    }
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
  getData(): DeepReadonly<V[]> {
    return this.data as unknown as DeepReadonly<V[]>;
  }
}
