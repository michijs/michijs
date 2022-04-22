import { ElementFactory, IterableJSX, LSCustomElement } from '../..';
import { Target } from '../classes/Target';
import { update } from './update';

function nodeNodeIsSameElement(node: ChildNode, jsx: JSX.Element) {
  const jsxKeyed = typeof jsx === 'object' && 'key' in jsx;
  if ('key' in node)
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
  createTarget(el: ParentNode, context: Element) {
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
  update(el: ParentNode, isSVG?: boolean, self?: LSCustomElement) {
    if (this.jsx.length === 0)
      el.textContent = '';
    else {
      const target = this.createTarget(el, self);
      let currentNode = el.firstChild;
      if (currentNode) {
        const pendingInsertions = new Array<{ index: number, jsx: IterableJSX }>();
        const removedItems = new Array<ChildNode>();
        let i = 0;

        // Remove non-matching items and update matching items
        do {
          const nextSibling = currentNode.nextSibling;
          const newChildJSX = this.jsx[i];
          if (nodeNodeIsSameElement(currentNode, newChildJSX))
            update(currentNode, newChildJSX, isSVG, self);
          else {
            if (typeof newChildJSX === 'object' && 'key' in newChildJSX)
              pendingInsertions.push({ index: i, jsx: newChildJSX });
            else
              currentNode.after(target.createSingleItem(newChildJSX, i));
            currentNode.remove();
            removedItems.push(currentNode);
          }
          i++;
          currentNode = nextSibling;
        } while (currentNode);
        // inserting elements in already explored places
        pendingInsertions.forEach(({ index, jsx }) => {
          const itemFoundIndex = removedItems.findIndex(x => x.key === jsx.key);
          let childNodeToInsert: ChildNode;
          if (itemFoundIndex === -1)
            childNodeToInsert = target.createSingleItem(jsx, index);
          else {
            childNodeToInsert = removedItems[itemFoundIndex];
            update(childNodeToInsert, jsx, isSVG, self);
            removedItems.splice(itemFoundIndex, 1);
          }

          // TODO: Find a way to get a relative child to insert after this one
          target.insertChildNodesAt(index, childNodeToInsert);
        });
        if (i < this.jsx.length) {
          if (removedItems.length > 0) {//Insert elements verifying first that they are not among the deleted ones
            const childrenNodesToAppend = new Array<ChildNode>();
            do {
              const jsx = this.jsx[i];
              if (typeof jsx === 'object' && 'key' in jsx) {
                const itemFoundIndex = removedItems.findIndex(x => x.key === jsx.key);
                if (itemFoundIndex === -1)
                  childrenNodesToAppend.push(target.createSingleItem(jsx, i));
                else {
                  const itemFOund = removedItems[itemFoundIndex];
                  childrenNodesToAppend.push(itemFOund);
                  update(itemFOund, jsx, isSVG, self);
                  removedItems.splice(itemFoundIndex, 1);
                }
              } else
                childrenNodesToAppend.push(target.createSingleItem(jsx, i));
              i++;
            } while (removedItems.length > 0 && i < this.jsx.length);
            el.append(...childrenNodesToAppend, ...target.create(this.jsx.slice(i)));
          } else //Then Insert new elements
            el.append(...target.create(this.jsx.slice(i)));
        }
      } else
        el.append(...target.create(this.jsx));
    }
  }
}
