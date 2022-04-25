import { DeepReadonly, FC, HTMLElements, ObjectJSXElement } from '../..';
import { LSTag } from '../h/tags/LSTag';
import { update } from '../DOMDiff/update';
import { Target } from './Target';

export type ElementListInterface<T> = Pick<Array<T>, 'push' | 'pop' | 'reverse' | 'shift' | 'unshift'>;

export type RenderFunction<T> = (item: T, index: number) => JSX.Element;
export class ElementList<T> implements ElementListInterface<T> {
    private targets = new Array<Target<T>>();
    private data: Array<T>;
    constructor(initialData: Array<T> = []) {
      this.data = initialData;
    }
    /**
     * Creates a new target
     */
    target: FC<{ as?: string } & LSTag<HTMLElements.div, HTMLDivElement>, RenderFunction<T>> = ({ as, children, ...attrs }) => {
      return {
        tag: as ?? 'div',
        attrs: {
          ...attrs,
          children: [],
          doNotTouchChildren: true,
          oncreated: (el: Element) => {
            const target = new Target<T>(el, children[0]);
            this.targets.push(target);
            if (this.data.length > 0)
              target.element.append(...target.create(this.data));
          }
        }
      } as ObjectJSXElement;
    }
    /**
     * Removes all the list elements
     */
    clear() {
      this.targets.forEach((target) => target.element.textContent = '');
      this.data = [];
    }
    /**
     * Replace all the list elements
     */
    replace(...items: T[]) {
      this.targets.forEach((target) => {
        target.element.textContent = '';
        target.element.append(...target.create(items));
      });
      this.data = items;
    }
    /**
     * Swap two list elements
     */
    swap(indexA: number, indexB: number) {
      if (indexA < this.data.length && indexB < this.data.length) {
        [this.data[indexA], this.data[indexB]] = [this.data[indexB], this.data[indexA]];
        const [greatestValue, lowestValue] = indexA > indexB ? [indexA, indexB] : [indexB, indexA];
        this.targets.forEach((target) => {
          const greatestValueNode = target.element.childNodes.item(greatestValue);
          const lowestValueNode = target.element.childNodes.item(lowestValue);
          const greatestValueNextNode = greatestValueNode.nextSibling;
          const lowestValueNextNode = lowestValueNode.nextSibling;
          target.element.insertBefore(greatestValueNode, lowestValueNextNode);
          target.element.insertBefore(lowestValueNode, greatestValueNextNode);
        });
      }
    }
    /**
     * Removes an item
     */
    remove(index: number) {
      this.targets.forEach((target) => target.element.childNodes.item(index).remove());
      this.data = this.data.filter((_x,i) => i !== index);
    }
    /**
     * Updates an item
     */
    update(index: number, callback: (oldValue: T) => T) {
      const newValue = callback(this.data[index]);
      this.data[index] = newValue;
      this.targets.forEach((target) => update(target.element.childNodes.item(index), target.renderItem(newValue, index)));
    }

    pop(): T {
      this.targets.forEach((target) => target.element.lastChild.remove());
      return this.data.pop();
    }
    push(...items: T[]): number {
      this.targets.forEach((target) => target.element.append(...target.create(items)));
      return this.data.push(...items);
    }
    reverse(): T[] {
      this.targets.forEach((target) => target.element.replaceChildren(...Array.from(target.element.childNodes).reverse()));
      return this.data.reverse();
    }
    shift(): T {
      this.targets.forEach((target) => target.element.firstChild.remove());
      return this.data.shift();
    }
    // sort(compareFn?: (a: T, b: T) => number): this {
    //     throw new Error('Method not implemented.');
    // }
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place.
     * Only positive values allowed
     */
    splice(start: number, deleteCount: number, ...items: T[]) {
      if (start >= 0 && deleteCount >= 0)
        if (start === 0 && deleteCount >= this.data.length)
          this.clear();
        else {
          this.targets.forEach((target) => {
            let item = target.element.childNodes.item(start),
              count = 0;
            while (item && count < deleteCount) {
              const nextSibling = item.nextSibling;
              item.remove();
              item = nextSibling;
              count++;
            }
            if (items.length > 0)
              target.insertItemsAt(start, ...items);
          });
          this.data.splice(start, deleteCount, ...items);
        }
    }
    unshift(...items: T[]): number {
      this.targets.forEach((target) => target.element.prepend(...target.create(items)));
      return this.data.unshift(...items);
    }
    getData(): DeepReadonly<T[]> {
      return this.data as unknown as DeepReadonly<T[]>;
    }
}