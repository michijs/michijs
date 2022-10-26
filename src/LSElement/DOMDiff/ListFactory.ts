import { ElementFactory, IterableAttrs, LSCustomElement } from '../..';
import { Target } from '../classes/Target';
import { ListElement } from '../components/FragmentAndList';

function nodeNodeIsSameElement(node: ChildNode, jsx: JSX.Element) {
  const isIterable = jsxIsIterable(jsx);
  if ('$key' in node)
    // Node keyed - jsx must be keyed and same key
    return isIterable && jsx.key === node.$key;
  return !isIterable;
}

function jsxIsIterable(jsx: JSX.Element): jsx is IterableAttrs<any> {
  return typeof jsx === 'object' && 'key' in jsx;
}

export function createTarget(el: ParentNode, isSVG: boolean, context: Element) {
  return new Target<JSX.Element>(el, (item) => {
    // TODO: should be a oncreate callback?
    if (typeof item === 'object' && 'key' in item)
      item['attrs']['_$key'] = item.key;
    return item;
  }, isSVG, context);
}

export const ListFactory: ElementFactory = {
  compare(el: Element): boolean {
    return el.localName === ListElement.tag;
  },
  create(jsx: JSX.Element[], isSVG?: boolean, self?: Element) {
    const el: HTMLElement | SVGElement = isSVG ? document.createElementNS('http://www.w3.org/2000/svg', ListElement.tag) : document.createElement(ListElement.tag);
    createTarget(el, isSVG, self).appendItems(...jsx);
    return el;
  },
  update(jsx: JSX.Element[], el: ParentNode, isSVG?: boolean, self?: LSCustomElement) {
    if (jsx.length === 0)
      el.textContent = '';
    else {
      const target = createTarget(el, isSVG, self);
      let currentNode = el.firstChild;
      if (currentNode) {
        const missingItems = new Map<number, JSX.Element>();
        const missingKeyedItems = new Map<string | number, { index: number, newChildJSX: JSX.Element }>();
        const itemsToDelete = new Map<number, ChildNode>();
        jsx.forEach((newChildJSX, i) => {
          if (currentNode) {
            if (nodeNodeIsSameElement(currentNode, newChildJSX))
              target.updateNode(currentNode, newChildJSX);
            else {
              itemsToDelete.set(i, currentNode);
              if (jsxIsIterable(newChildJSX))
                missingKeyedItems.set(newChildJSX.key, { index: i, newChildJSX });
              else
                missingItems.set(i, newChildJSX);
            }
            currentNode = currentNode.nextSibling;
          } else if (jsxIsIterable(newChildJSX))
            missingKeyedItems.set(newChildJSX.key, { index: i, newChildJSX });
          else
            missingItems.set(i, newChildJSX);
        });

        // If there is any tentative item to remove
        if (itemsToDelete.size > 0 || currentNode) {
          const deleteCallback = (node: ChildNode, nodeIndex: number) => {
            // I identify moved items, if they were not moved, I delete them
            const itemFound = missingKeyedItems.get(node.$key);
            if (itemFound) {
              missingKeyedItems.delete(node.$key);
              target.updateNode(node, itemFound.newChildJSX);
              if (nodeIndex !== itemFound.index) {
                target.insertChildNodesAt(itemFound.index, node);
                return true;
              }
            } else {
              node.remove();
              return false;
            }
          };

          let removedNodes = 0;
          // Previously walked elements
          itemsToDelete.forEach((node, i) => {
            if (!deleteCallback(node, i - removedNodes))
              removedNodes++;
          });

          // Previously unwalked elements
          // Ex. [0, 1, 2, 3, 6]
          if (currentNode) {
            let processedElements = jsx.length - removedNodes;
            do {
              const nextNode = currentNode?.nextSibling;
              if (deleteCallback(currentNode, processedElements))
                processedElements++;
              currentNode = nextNode;
            } while (currentNode);
          }

          if (jsx.length === missingItems.size - missingKeyedItems.size) //All elements were replaced
            target.appendItems(...jsx);
          else { // There is a mix between new and old elements
            missingItems.forEach((newChildJSX, index) => {
              target.insertItemsAt(index, newChildJSX);
            });
            missingKeyedItems.forEach(({ newChildJSX, index }) => {
              target.insertItemsAt(index, newChildJSX);
            });
          }
        } else //There are no items to remove - it follows that they are all new items
          target.appendItems(...jsx.slice(jsx.length - missingItems.size - missingKeyedItems.size));

      } else
        target.appendItems(...jsx);
    }
  }
};
