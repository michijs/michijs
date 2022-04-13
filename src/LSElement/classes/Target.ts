import { getElementFactory, update } from '../DOMDiff/update';
import { RenderFunction } from './ElementList';

export class Target<T> {
    element: ParentNode;
    renderItem: RenderFunction<T>;
    template: ChildNode | ParentNode;
    context: Element;

    constructor(element: ParentNode, renderItem: (item: T) => JSX.Element, context?: Element) {
      this.element = element;
      this.renderItem = renderItem;
      this.context = context;
    }

    getTemplate(items: T[]) {
      // TODO: is svg?
      if (!this.template)
        this.template = getElementFactory(this.renderItem(items[0], 0), this.context).create(false, this.context);
      return this.template;
    }

    render(items: T[]) {
      const template = this.getTemplate(items);
      return items.map((item, index) => {
        const el = template.cloneNode(true) as ChildNode;
        update(el, this.renderItem(item, index));
        return el;
      });
    }

    insertItemsAt(i: number, ...items: T[]) {
      const renderResult = this.render(items);
      if (i === 0)
        this.element.prepend(...renderResult);
      else if (i > items.length)
        this.element.append(...renderResult);

      else
        this.element.childNodes.item(i).after(...renderResult);
    }
}
