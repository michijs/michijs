import { getElementFactory, update } from '../DOMDiff/update';
import { RenderFunction } from './ElementList';

export class Target<T> {
  element: ParentNode;
  renderItem: RenderFunction<T>;
  private template: ChildNode | ParentNode;
  private context: Element;

  constructor(element: ParentNode, renderItem: (item: T) => JSX.Element, context?: Element) {
    this.element = element;
    this.renderItem = renderItem;
    this.context = context;
  }

  getTemplate(item: T) {
    // TODO: is svg?
    if (!this.template)
      this.template = getElementFactory(this.renderItem(item, 0), this.context).create(false, this.context);
    return this.template;
  }

  create(items: T[]) {
    const template = this.getTemplate(items[0]);
    return items.map((item, index) => this.createSingleItem(item, index, template));
  }

  createSingleItem(item: T, index: number, template = this.getTemplate(item)) {
    const el = template.cloneNode(true) as ChildNode;
    update(el, this.renderItem(item, index));
    return el;
  }

  insertItemsAt(i: number, ...items: T[]) {
    const renderResult = this.create(items);

    this.insertChildNodesAt(i, ...renderResult);
  }

  insertChildNodesAt(i: number, ...childNodes: ChildNode[]) {
    if (i === 0)
      this.element.prepend(...childNodes);
    else 
      this.element.childNodes.item(i - 1).after(...childNodes);
  }
}
