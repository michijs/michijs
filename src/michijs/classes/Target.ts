import { create } from '../DOMDiff';
import { update } from '../DOMDiff/update';
import { RenderFunction } from './ElementList';

export class Target<V> {
  private template: ChildNode | ParentNode;

  constructor(
    private element: ParentNode,
    private renderItem: RenderFunction<V>,
    private isSVG?: boolean,
    private isMATHML?: boolean,
    private context?: Element,
  ) {}

  private getTemplate(value: V) {
    return (
      this.template ??
      create(this.renderItem(value), this.isSVG, this.isMATHML, this.context)
    );
  }

  private create(...items: V[]): ChildNode[] {
    if (items.length > 0) {
      const template = this.getTemplate(items[0]);
      return items.map((item) => this.createSingleItem(item, template));
    }
    return [];
  }

  createSingleItem(item: V, template = this.getTemplate(item)): ChildNode {
    const el = template.cloneNode(true) as ChildNode;
    update(el, this.renderItem(item), this.isSVG, this.isMATHML, this.context);
    return el;
  }

  clear() {
    this.element.textContent = '';
  }

  replace(...items: V[]) {
    // A little better than replaceChildren
    this.clear();
    this.appendItems(...items);
  }

  replaceNode(el: ChildNode, value: V) {
    const newNode = this.createSingleItem(value);
    el.replaceWith(newNode);
  }

  update(index: number, value: V) {
    update(
      this.element.childNodes.item(index),
      this.renderItem(value),
      this.isSVG,
      this.isMATHML,
      this.context,
    );
  }

  updateNode(el: ChildNode, value: V) {
    update(el, this.renderItem(value), this.isSVG, this.isMATHML, this.context);
  }

  pop() {
    this.element.lastChild?.remove();
  }

  shift() {
    this.element.firstChild?.remove();
  }

  remove(index: number) {
    this.element.childNodes.item(index)?.remove();
  }

  insertItemsAt(i: number, ...items: V[]) {
    const renderResult = this.create(...items);

    this.insertChildNodesAt(i, ...renderResult);
  }

  prependItems(...items: V[]) {
    const renderResult = this.create(...items);

    this.element.prepend(...renderResult);
  }

  appendItems(...items: V[]) {
    const renderResult = this.create(...items);

    this.element.append(...renderResult);
  }

  reverse() {
    this.element.replaceChildren(
      ...Array.from(this.element.childNodes).reverse(),
    );
  }

  swap(indexA: number, indexB: number) {
    const elA = this.element.childNodes.item(indexA);
    const elB = this.element.childNodes.item(indexB);
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
      } else {
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

  insertChildNodesAt(i: number, ...childNodes: ChildNode[]) {
    if (i === 0) this.element.prepend(...childNodes);
    else this.element.childNodes.item(i - 1).after(...childNodes);
  }
}
