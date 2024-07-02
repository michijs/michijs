import { create } from "../DOMDiff";

/**
 * @typedef {import('../types').CreateOptions} CreateOptions
 * @typedef {import('../types').FC} FC
 */

/**
 * @typedef {import('./VirtualFragment').VirtualFragment} VirtualFragment
 */

/**
 * @template V
 */
export class Target {
    /**
     * @private
     * @type {VirtualFragment | ParentNode}
     */
    element;
    /**
     * @private
     * @type {FC<V>}
     */
    renderItem;
    /**
     * @private
     * @type {CreateOptions}
     */
    options;
    /**
     * @param {VirtualFragment | ParentNode} element
     * @param {FC<V>} renderItem
     * @param {CreateOptions} [options]
     */
    constructor(element, renderItem, options) {
        this.element = element;
        this.renderItem = renderItem;
        this.options = options;
    }

    clear() {
        this.element.textContent = "";
    }

    /**
     * @param {V} value
     */
    createSingleItem(value) {
        return create(this.renderItem(value), this.options);
    }
    /**
     * @param {...V} [value]
     */
    create(...value) {
        return value.map((x) => this.createSingleItem(x));
    }

    /**
     * @param {...V} [items]
     */
    replace(...items) {
        // A little better than replaceChildren
        this.clear();
        this.appendItems(...items);
    }

    /**
     * @param {ChildNode} el
     * @param {V} value
     */
    replaceNode(el, value) {
        const newNode = this.createSingleItem(value);
        el.replaceWith(newNode);
    }

    pop() {
        this.element.lastChild?.remove();
    }

    shift() {
        this.element.firstChild?.remove();
    }

    /**
     * @param {number} index
     */
    remove(index) {
        this.element.childNodes[index]?.remove();
    }

    /**
     * @param {number} i
     * @param {...V} [items]
     */
    insertItemsAt(i, ...items) {
        const renderResult = this.create(...items);

        this.insertChildNodesAt(i, ...renderResult);
    }

    /**
     * @param {...V} [items]
     */
    prependItems(...items) {
        const renderResult = this.create(...items);

        this.element.prepend(...renderResult);
    }

    /**
     * @param {...V} [items]
     */
    appendItems(...items) {
        const renderResult = this.create(...items);

        this.element.append(...renderResult);
    }

    reverse() {
        this.element.replaceChildren(...Array.from(this.element.childNodes).reverse());
    }

    /**
     * @param {number} indexA
     * @param {number} indexB
     */
    swap(indexA, indexB) {
        const elA = this.element.childNodes[indexA];
        const elB = this.element.childNodes[indexB];
        if (elA && elB) {
            const previousSiblingA = elA.previousSibling;
            if (previousSiblingA) {
                if (previousSiblingA === elB)
                    // if [B, A] then move B after A
                    elA.after(elB);
                else {
                    //if [B, ... , previousSiblingA, A] then replace B with A and move B after previousSiblingA
                    elB.replaceWith(elA);
                    previousSiblingA.after(elB);
                }
            }
            else {
                const nextSiblingA = elA.nextSibling;
                if (nextSiblingA === elB)
                    // if [A, B] then move A after B
                    elB.after(elA);
                else {
                    //if [A, nextSiblingA, ... , B] then replace B with A and move B before nextSiblingA
                    elB.replaceWith(elA);
                    nextSiblingA?.before(elB);
                }
            }
        }
        // [this.data[indexA], this.data[indexB]] = [this.data[indexB], this.data[indexA]];
        // const [greatestValue, lowestValue] = indexA > indexB ? [indexA, indexB] : [indexB, indexA];
        // this.targets.forEach(target => {
        //   const greatestValueNode = target.element.childNodes.item(greatestValue);
        //   const lowestValueNode = target.element.childNodes.item(lowestValue);
        //   const greatestValueNextNode = greatestValueNode.nextSibling;
        //   const lowestValueNextNode = lowestValueNode.nextSibling;
        //   target.element.insertBefore(greatestValueNode, lowestValueNextNode);
        //   target.element.insertBefore(lowestValueNode, greatestValueNextNode);
        // });
    }

    /**
     * @param {number} i
     * @param {...Node} [childNodes]
     */
    insertChildNodesAt(i, ...childNodes) {
        if (i === 0)
            this.element.prepend(...childNodes);
        else
            this.element.childNodes[i - 1].after(...childNodes);
    }
    /**
     * @param {number} start
     * @param {number} deleteCount
     * @param {...V} [items]
     */
    splice(start, deleteCount, ...items) {
        const len = this.element.childNodes.length;
        const relativeStart = start >> 0;
        const k = relativeStart < 0
            ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len);

        let item = this.element.childNodes.item(k), count = 0;
        while (item && count < deleteCount) {
            const nextSibling = item.nextSibling;
            item.remove();
            item = nextSibling;
            count++;
        }
        if (items.length > 0)
            this.insertItemsAt(k, ...items);
    }
    /**
     * @param {V} value
     * @param {number} [end]
     */
    fill(value, start = 0, end) {
        const len = this.element.childNodes.length;
        const relativeStart = start >> 0;

        let k = relativeStart < 0
            ? Math.max(len + relativeStart, 0)
            : Math.min(relativeStart, len);

        const relativeEnd = end === undefined ? len : end >> 0;

        const final = relativeEnd < 0
            ? Math.max(len + relativeEnd, 0)
            : Math.min(relativeEnd, len);

        while (k < final) {
            this.remove(k);
            this.insertItemsAt(k, value);
            k++;
        }
    }
}
