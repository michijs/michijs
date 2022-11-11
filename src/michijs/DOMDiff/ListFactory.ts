import { ElementFactory, IterableAttrs, MichiCustomElement, update } from '../..';
import { Target } from '../classes/Target';
import { ListElement } from '../components/FragmentAndList';
import { forEachChildren } from './forEachChildren';

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

export function mapFind<K, V>(map: Map<K, V>, callback: (value: V) => boolean): [K, V] | undefined {
  for (const [key, value] of map) {
    if (callback(value))
      return [key, value];
  }
  return undefined;
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
  update(jsx: JSX.Element[], el: ParentNode, isSVG?: boolean, contextElement?: MichiCustomElement) {
    if (jsx.length === 0)
      el.textContent = '';
    else {
      const pendingToInsertKeyedItems: { index: number, newChildJSX: JSX.Element, key: string | number }[] = [];
      const pendingToRemoveKeyedItems = new Map<number, { key: string | number, child: ChildNode }>();
      const RemovedKeyedItems = new Map<string | number, ChildNode>();
      const target = createTarget(el, isSVG, contextElement);

      // Walk thought the current children and
      const nextIndex = forEachChildren(el.firstChild, (currentNode, i) => {
        const newChildJSX = jsx[i];
        if (nodeNodeIsSameElement(currentNode, newChildJSX))
          target.updateNode(currentNode, newChildJSX)
        else {
          if (jsxIsIterable(newChildJSX)) {
            pendingToRemoveKeyedItems.set(i, { key: currentNode.$key, child: currentNode })
            pendingToInsertKeyedItems.push({ index: i, key: newChildJSX.key, newChildJSX });
          } else {
            if (currentNode.$key)
              RemovedKeyedItems.set(currentNode.$key, currentNode);
            target.replaceNode(currentNode, newChildJSX);
          }
        }
      })

      // moved nodes on previously walked elements
      pendingToInsertKeyedItems.forEach(({ index, newChildJSX, key }) => {
        const nodeInThePlace = pendingToRemoveKeyedItems.get(index);

        let itemFound = RemovedKeyedItems.get(key);
        if (itemFound) {
          RemovedKeyedItems.delete(key);
        } else {
          const itemFoundInPendingToRemoveKeyedItems = mapFind(pendingToRemoveKeyedItems, (value) => value.key === key);
          if (itemFoundInPendingToRemoveKeyedItems) {
            const result = itemFoundInPendingToRemoveKeyedItems;
            itemFound = result[1].child;

            const tempChild = document.createComment('');
            result[1].child.replaceWith(tempChild);
            result[1].child = tempChild;
          }
        }
        pendingToRemoveKeyedItems.delete(index);
        RemovedKeyedItems.set(nodeInThePlace.key, nodeInThePlace.child);
        if (itemFound) {
          update(itemFound, newChildJSX, isSVG, contextElement);
          nodeInThePlace.child.replaceWith(itemFound);
        } else {
          target.replaceNode(nodeInThePlace.child, newChildJSX);
        }
      })

      // new nodes
      const pendingChildren = jsx.slice(nextIndex);
      if (RemovedKeyedItems.size > 0)
        target.insertChildNodesAt(nextIndex, ...pendingChildren.map(newChildJSX => {
          if (jsxIsIterable(newChildJSX)) {
            const itemFound = RemovedKeyedItems.get(newChildJSX.key);
            if (itemFound)
              return itemFound
          }
          return target.createSingleItem(newChildJSX)
        }))
      else
        target.insertItemsAt(nextIndex, ...pendingChildren)
    }
  }
};
