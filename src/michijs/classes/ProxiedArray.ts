import { create } from "../DOM/create/create";
import type { FC, ListProps, SingleJSXElement } from "../types";
import { Target } from "./Target";
import { VirtualFragment } from "./VirtualFragment";

export class ProxiedArray<V>
    extends Array<V> {
    #targets = new Array<Target<V>>();

    List<const E = FC>(
        { as: asTag, renderItem, useTemplate, ...attrs }: ListProps<E, V>,
        contextElement?: Element,
        contextNamespace?: string,
    ): Node {
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
    };

    $clear(): void {
        this.#targets.forEach((target) => target.clear());
        this.length = 0;
    }

    $replace(...items: V[]): number {
        if (this.length) {
            this.#targets.forEach((target) => target.replace(items));
            this.length = items.length;
            items.forEach((x, i) => this[i] = x);
        } else {
            this.#targets.forEach((target) => target.appendItems(items));
            super.push(...items)
        };
        return items.length;
    }

    $remove(index: number): number {
        this.#targets.forEach((target) => target.remove(index));
        super.splice(index, 1);
        return this.length;
    }

    $swap(indexA: number, indexB: number): boolean | void {
        if (this.length > indexA && this.length > indexB) {
            this.#targets.forEach((target) => target.swap(indexA, indexB));
            [this[indexA], this[indexB]] = [
                this[indexB],
                this[indexA],
            ];
            return true;
        }
    }

    override pop(): V | undefined {
        this.#targets.forEach((target) => target.pop());
        return super.pop();
    }

    override push(...items: V[]): number {
        if (items.length > 0)
            this.#targets.forEach((target) => target.appendItems(items));
        return super.push(...items);
    }
    override reverse(): V[] {
        this.#targets.forEach((target) => target.reverse());
        return super.reverse();
    }
    override shift(): V | undefined {
        this.#targets.forEach((target) => target.shift());
        return super.shift();
    }
    override unshift(...items: V[]): number {
        this.#targets.forEach((target) => target.prependItems(items));
        return super.unshift(...items);
    }
    override fill(item: V, start?: number, end?: number) {
        this.#targets.forEach((target) => target.fill(item, start, end));
        super.fill(item, start, end);
        return this
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
            this.#targets.forEach((target) => {
                indexesArray.forEach(({ currentIndex, newIndex }) => {
                    target.swap(currentIndex, newIndex);
                });
            });
        }
        return this;
    }
    override splice(start: number, deleteCount = 0, ...items: V[]): V[] {
        if (start === 0 && deleteCount >= this.length) this.$replace(...items);
        else {
            this.#targets.forEach((target) =>
                target.splice(start, deleteCount, items),
            );
            super.splice(start, deleteCount, ...items);
        }
        return this;
    }
}