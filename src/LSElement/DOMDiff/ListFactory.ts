import { ElementFactory, IterableJSX, LSCustomElement } from '../..';
import { Target } from '../classes/Target';
import { ListTag } from '../constants';
import { update } from './update';

function nodeNodeIsSameElement(node: ChildNode, jsx: JSX.Element) {
  const jsxKeyed = typeof jsx === 'object' && 'key' in jsx;
  if ('key' in node)
    // Node keyed - jsx must be keyed and same key
    return jsxKeyed && jsx.key === node.key;
  return !jsxKeyed;
}

function createTarget(el: ParentNode, context: Element) {
  // TODO: is svg?
  return new Target<JSX.Element>(el, (item) => {
    if (typeof item === 'object' && 'key' in item)
      item['attrs']['_key'] = item.key;
    return item;
  }, context);
}

export const ListFactory: ElementFactory = {
  compare(el: Element): boolean {
    return el.localName === 'ls-list';
  },
  create(jsx: JSX.Element[], isSVG?: boolean, self?: Element) {
    const el: HTMLElement | SVGElement = isSVG ? document.createElementNS('http://www.w3.org/2000/svg', ListTag) : document.createElement(ListTag);
    import('../utils/addFragmentAndListStyle').then(x => x.addFragmentAndListStyle(el, self));
    el.append(...createTarget(el, self).create(jsx));
    return el;
  },
  update(jsx: JSX.Element[], el: ParentNode, isSVG?: boolean, self?: LSCustomElement) {
    if (jsx.length === 0)
      el.textContent = '';
    else {
      const target = createTarget(el, self);
      let currentNode = el.firstChild;
      if (currentNode) {
        const pendingInsertions = new Array<{ index: number, newChildJSX: IterableJSX }>();
        const removedItems = new Array<ChildNode>();
        let i = 0;

        // Remove non-matching items and update matching items
        do {
          const nextSibling = currentNode.nextSibling;
          const newChildJSX = jsx[i];
          if (nodeNodeIsSameElement(currentNode, newChildJSX))
            update(currentNode, newChildJSX, isSVG, self);
          else {
            if (typeof newChildJSX === 'object' && 'key' in newChildJSX)
              pendingInsertions.push({ index: i, newChildJSX });
            else
              currentNode.after(target.createSingleItem(newChildJSX, i));
            currentNode.remove();
            removedItems.push(currentNode);
          }
          i++;
          currentNode = nextSibling;
        } while (currentNode);
        // inserting elements in already explored places
        pendingInsertions.forEach(({ index, newChildJSX }) => {
          const itemFoundIndex = removedItems.findIndex(x => x.key === newChildJSX.key);
          let childNodeToInsert: ChildNode;
          if (itemFoundIndex === -1)
            childNodeToInsert = target.createSingleItem(newChildJSX, index);
          else {
            childNodeToInsert = removedItems[itemFoundIndex];
            update(childNodeToInsert, newChildJSX, isSVG, self);
            removedItems.splice(itemFoundIndex, 1);
          }

          // TODO: Find a way to get a relative child to insert after this one
          target.insertChildNodesAt(index, childNodeToInsert);
        });
        if (i < jsx.length) {
          if (removedItems.length > 0) {//Insert elements verifying first that they are not among the deleted ones
            const childrenNodesToAppend = new Array<ChildNode>();
            do {
              const newChildJSX = jsx[i];
              if (typeof newChildJSX === 'object' && 'key' in newChildJSX) {
                const itemFoundIndex = removedItems.findIndex(x => x.key === newChildJSX.key);
                if (itemFoundIndex === -1)
                  childrenNodesToAppend.push(target.createSingleItem(newChildJSX, i));
                else {
                  const itemFOund = removedItems[itemFoundIndex];
                  childrenNodesToAppend.push(itemFOund);
                  update(itemFOund, newChildJSX, isSVG, self);
                  removedItems.splice(itemFoundIndex, 1);
                }
              } else
                childrenNodesToAppend.push(target.createSingleItem(newChildJSX, i));
              i++;
            } while (removedItems.length > 0 && i < jsx.length);
            el.append(...childrenNodesToAppend, ...target.create(jsx.slice(i)));
          } else //Then Insert new elements
            el.append(...target.create(jsx.slice(i)));
        }
      } else
        el.append(...target.create(jsx));
    }
  }
};
