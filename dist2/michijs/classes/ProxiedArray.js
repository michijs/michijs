import { ProxiedValue, } from "../..";
import { create } from "../DOMDiff";
import { Target } from "./Target";
import { VirtualFragment } from "./VirtualFragment";

/**
 * @typedef {import('../..').CreateOptions} CreateOptions
 * @typedef {import('../..').ExtendableComponentWithoutChildren} ExtendableComponentWithoutChildren
 * @typedef {import('../..').SingleJSXElement} SingleJSXElement
 * @typedef {import('../..').ProxiedArrayInterface} ProxiedArrayInterface
 * @typedef {import('../..').MutableArrayProperties} MutableArrayProperties
 * @typedef {import('../..').FC} FC
 */

/**
 * @template V
 * @implements {ProxiedArrayInterface<V, V>}
 * @implements {Pick<Array<V>, MutableArrayProperties>}
 */
export class ProxiedArray extends ProxiedValue {
    /**
     * @private
     */
    targets = new Array();
    List = ({ as: asTag, renderItem, ...attrs }, context) => {
        const el = asTag
            ? create({
                jsxTag: asTag,
                attrs,
            })
            : new VirtualFragment();

        const newTarget = new Target(el, renderItem, context);

        this.targets.push(newTarget);

        newTarget.appendItems(...this.$value);

        return el.valueOf();
    };

    $clear() {
        this.targets.forEach((target) => target.clear());
        this.$value = [];
        this.notifyCurrentValue();
    }

    /**
     * @param {...V} [items]
     */
    $replace(...items) {
        this.targets.forEach((target) => target.replace(...items));
        this.$value = items;
        this.notifyCurrentValue();
        return items.length;
    }

    /**
     * @param {number} index
     */
    $remove(index) {
        this.$value = this.$value.filter((_x, i) => i !== index);
        this.targets.forEach((target) => target.remove(index));
        this.notifyCurrentValue();
        return this.$value.length;
    }

    /**
     * @param {number} indexA
     * @param {number} indexB
     */
    $swap(indexA, indexB) {
        if (this.$value.length > indexA && this.$value.length > indexB) {
            this.targets.forEach((target) => target.swap(indexA, indexB));
            [this.$value[indexA], this.$value[indexB]] = [
                this.$value[indexB],
                this.$value[indexA],
            ];
            this.notifyCurrentValue();
        }
    }

    pop() {
        this.targets.forEach((target) => target.pop());
        const result = this.$value.pop();
        this.notifyCurrentValue();

        return result;
    }

    /**
     * @param {...V} [items]
     */
    push(...items) {
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
    shift() {
        this.targets.forEach((target) => target.shift());
        const result = this.$value.shift();
        this.notifyCurrentValue();
        return result;
    }
    /**
     * @param {...V} [items]
     */
    unshift(...items) {
        this.targets.forEach((target) => target.prependItems(...items));
        const result = this.$value.unshift(...items);
        this.notifyCurrentValue();
        return result;
    }
    /**
     * @param {V} item
     * @param {number} [start]
     * @param {number} [end]
     */
    fill(item, start, end) {
        this.targets.forEach((target) => target.fill(item, start, end));
        const result = this.$value.fill(item, start, end);
        this.notifyCurrentValue();
        return result;
    }
    /**
     * @param {(a: V, b: V) => number} [compareFn]
     */
    sort(compareFn) {
        const arrayCopy = [...this.$value];
        const result = this.$value.sort(compareFn);
        if (this.targets.length > 0) {
            const indexesArray = arrayCopy.reduce((previousValue, currentValue, currentIndex) => {
                const newIndex = result.indexOf(currentValue);
                // To avoid repeated indexes
                if (newIndex > currentIndex) {
                    previousValue.push({
                        currentIndex,
                        newIndex,
                    });
                }
                return previousValue;
            }, new Array());
            this.targets.forEach((target) => {
                indexesArray.forEach(({ currentIndex, newIndex }) => {
                    target.swap(currentIndex, newIndex);
                });
            });
        }
        return result;
    }
    /**
     * @param {number} start
     * @param {...V} [items]
     */
    splice(start, deleteCount = 0, ...items) {
        if (start === 0 && deleteCount >= this.$value.length)
            this.$replace(...items);
        else {
            this.targets.forEach((target) => target.splice(start, deleteCount, ...items));
            this.$value.splice(start, deleteCount, ...items);
        }
        return this.$value;
    }
}
