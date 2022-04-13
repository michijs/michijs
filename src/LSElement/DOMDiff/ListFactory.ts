import { ElementFactory, LSCustomElement } from '../..';
import { nodeIsElement } from '../typeWards/nodeIsElement';
import { Target } from '../classes/Target';
import { update } from './update';

export class ListFactory implements ElementFactory {
    jsx: JSX.Element[];
    constructor(jsx: JSX.Element[]) {
      this.jsx = jsx;
    }
    compare(el: Element): boolean {
      return el.localName === 'ls-list';
    }
    createTarget(el: Element, context: Element) {
      // TODO: is svg?
      return new Target<JSX.Element>(el, (item) => {
        if (typeof item === 'object' && 'key' in item)
          item['attrs']['_key'] = item.key;
        return item;
      }, context);
    }
    create(isSVG?: boolean, self?: Element) {
      let el: Element;
      if (isSVG) {
        el = document.createElementNS('http://www.w3.org/2000/svg', 'ls-list');
      } else {
        el = document.createElement('ls-list');
      }

      el.append(...this.createTarget(el, self).render(this.jsx));
      return el;
    }
    update(el: Element, isSVG?: boolean, self?: LSCustomElement) {
      if (this.jsx.length === 0) {
        if (el.hasChildNodes())
          el.textContent = '';
      } else {
        const target = this.createTarget(el, self);
        const temptativeToAdd = new Array<{ index: number; jsx: JSX.Element; }>();
        const temptativeToRemove = new Array<{ index: number; node: Node; }>();

        console.log(this.jsx);
        this.jsx.forEach((newChildJsx, i) => {
          const node = el.childNodes.item(i);
          if (node) {
            if (typeof newChildJsx === 'object' && 'key' in newChildJsx) {
              if (nodeIsElement(node)) {
                if (node.key === newChildJsx.key)
                  update(node, newChildJsx, isSVG, self);
                else {
                  temptativeToRemove.push({ index: i, node });
                  temptativeToAdd.push({ index: i, jsx: newChildJsx });
                }
              } else {
                temptativeToRemove.push({ index: i, node });
                temptativeToAdd.push({ index: i, jsx: newChildJsx });
              }
            } else if (nodeIsElement(node)) {
              temptativeToRemove.push({ index: i, node });
              temptativeToAdd.push({ index: i, jsx: newChildJsx });
            }
            else
              update(node, newChildJsx, isSVG, self);
          }
          else
            temptativeToAdd.push({ index: i, jsx: newChildJsx });
        });
        console.log({ temptativeToAdd, temptativeToRemove });
      }
    }
}
