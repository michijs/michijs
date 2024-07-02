import { forEachChildren } from "../DOMDiff/forEachChildren";
import { isElement } from "../typeWards/isElement";

/**
 * @implements {NodeListOf<ChildNode>}
 */
export class VirtualChildNodes extends Array {
    /**
     * @param {number} index
     */
    item(index) {
        return this.at(index) ?? null;
    }
    /**
     * @param {(value: ChildNode, key: number, parent: any) => void} callbackfn
     * @param {*} [thisArg]
     */
    forEach(callbackfn, thisArg) {
        super.forEach(callbackfn, thisArg);
    }
}

/**
 * @implements {Pick< ParentNode, | "textContent" | "prepend" | "append" | "replaceChildren" | "firstChild" | "lastChild" | "childNodes" >}
 * @implements {Pick<ChildNode, "remove" | "replaceWith" | "textContent">}
 * @implements {Pick<Element, "innerHTML">}
 */
export class VirtualFragment {
    /**
     * @private
     */
    startItem = document.createComment("<fragment>");
    /**
     * @private
     */
    endItem = document.createComment("</fragment>");
    /**
     * @private
     */
    initialFragment = new DocumentFragment();

    /**
     * @param {Node[]} [initialItems=[]]
     */
    constructor(initialItems = []) {
        this.initialFragment.append(this.startItem, ...initialItems, this.endItem);
    }
    /**
     * @param {...(string | Node)} [nodes]
     */
    replaceWith(...nodes) {
        if (this.startItem.isConnected) {
            const childNodes = this.childNodes;
            this.startItem.replaceWith(...nodes);
            this.initialFragment.textContent = "";
            this.initialFragment.append(this.startItem, ...childNodes, this.endItem);
        }
    }
    remove() {
        if (this.startItem.isConnected) {
            const childNodes = this.childNodes;
            this.initialFragment.textContent = "";
            this.initialFragment.append(this.startItem, ...childNodes, this.endItem);
        }
    }
    /**
     * @param {...(string | Node)} [nodes]
     */
    prepend(...nodes) {
        this.startItem?.after(...nodes);
    }
    /**
     * @param {...(string | Node)} [nodes]
     */
    append(...nodes) {
        this.endItem?.before(...nodes);
    }
    /**
     * @param {...(string | Node)} [nodes]
     */
    replaceChildren(...nodes) {
        forEachChildren(this.startItem.nextSibling, (node) => {
            node.remove();
        }, (node) => node !== this.endItem);
        this.append(...nodes);
    }
    get lastChild() {
        const previousSibling = this.endItem.previousSibling;
        return previousSibling !== this.startItem ? previousSibling : null;
    }
    get childNodes() {
        const childNodes = new VirtualChildNodes();
        forEachChildren(this.startItem.nextSibling, (node) => {
            childNodes.push(node);
        }, (node) => node !== this.endItem);

        return childNodes;
    }
    get firstChild() {
        const nextSibling = this.startItem.nextSibling;
        return nextSibling !== this.endItem ? nextSibling : null;
    }
    get innerHTML() {
        let innerHTML = "";
        forEachChildren(this.startItem.nextSibling, (node) => (innerHTML += isElement(node) ? node.outerHTML : node.textContent), (node) => node !== this.endItem);
        return innerHTML;
    }
    set innerHTML(content) {
        const fragment = document.createRange().createContextualFragment(content);
        this.replaceChildren(fragment);
    }
    get textContent() {
        let textContext = "";
        forEachChildren(this.startItem.nextSibling, (node) => (textContext += node.textContent), (node) => node !== this.endItem);
        return textContext;
    }
    set textContent(content) {
        this.replaceChildren(content);
    }

    valueOf() {
        this.remove();
        return this.initialFragment;
    }
}
