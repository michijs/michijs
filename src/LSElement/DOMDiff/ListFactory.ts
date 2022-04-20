import { ElementFactory, IterableJSX, LSCustomElement } from '../..';
import { Target } from '../classes/Target';
import { update } from './update';

function nodeNodeIsSameElement(node: ChildNode, jsx: JSX.Element) {
  const jsxKeyed = typeof jsx === 'object' && 'key' in jsx;
  if (node.key)
    // Node keyed - jsx must be keyed and same key
    return jsxKeyed && jsx.key === node.key;
  return !jsxKeyed;
}

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
    const el: Element = isSVG ? document.createElementNS('http://www.w3.org/2000/svg', 'ls-list') : document.createElement('ls-list');
    el.append(...this.createTarget(el, self).create(this.jsx));
    return el;
  }
  update(el: Element, isSVG?: boolean, self?: LSCustomElement) {
    if (this.jsx.length === 0) {
      el.textContent = '';
    } else if (el.hasChildNodes()) {
      const pendingInsertions = new Array<{ index: number, jsx: IterableJSX }>();
      const removedItems = new Array<ChildNode>();
      const target = this.createTarget(el, self);
      let i = 0;

      for (; i - removedItems.length < el.childElementCount; i++) {
        const currentNode = el.childNodes.item(i - removedItems.length);
        const newChildJSX = this.jsx[i];
        if (nodeNodeIsSameElement(currentNode, newChildJSX))
          update(currentNode, newChildJSX, isSVG, self);
        else {
          currentNode.remove();
          removedItems.push(currentNode);
          if (typeof newChildJSX === 'object' && 'key' in newChildJSX)
            pendingInsertions.push({ index: i, jsx: newChildJSX });
          else
            target.insertChildNodesAt(i, target.createSingleItem(newChildJSX, i));

        }
      }
      pendingInsertions.forEach(({ index, jsx }) => {
        const itemFoundIndex = removedItems.findIndex(x => x.key === jsx.key);
        let el: ChildNode;
        if (itemFoundIndex === -1)
          el = target.createSingleItem(jsx, index);
        else {
          el = removedItems[itemFoundIndex];
          update(el, jsx, isSVG, self);
          removedItems.splice(itemFoundIndex, 1);
        }

        target.insertChildNodesAt(index, el);
      });
      for (let index = i; index < this.jsx.length; index++) {
        const jsx = this.jsx[index];
        let el: ChildNode;
        if (typeof jsx === 'object' && 'key' in jsx) {
          const itemFoundIndex = removedItems.findIndex(x => x.key === jsx.key);
          if (itemFoundIndex === -1)
            el = target.createSingleItem(jsx, index);
          else {
            el = removedItems[itemFoundIndex];
            update(el, jsx, isSVG, self);
            removedItems.splice(itemFoundIndex, 1);
          }
        } else
          el = target.createSingleItem(jsx, index);

        target.insertChildNodesAt(index, el);
      }

    } else
      el.append(...this.createTarget(el, self).create(this.jsx));
  }
}
