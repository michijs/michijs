import { Target } from '../classes/Target';
import { ListElement } from '../components/FragmentAndList';
import { ElementFactory, IterableJSX, MichiCustomElement } from '../types';
import { forEachChildren } from './forEachChildren';
import { update } from './update';

function nodeNodeIsSameElement(node: ChildNode, jsx: JSX.Element) {
  const isIterable = jsxIsIterable(jsx);
  if ('$key' in node)
    // Node keyed - jsx must be keyed and same key
    return isIterable && jsx.key === node.$key;
  return !isIterable;
}

function jsxIsIterable(jsx: JSX.Element): jsx is IterableJSX {
  return !!jsx && typeof jsx === 'object' && 'key' in jsx;
}

export function createTarget(
  el: ParentNode,
  isSVG?: boolean,
  isMATHML?: boolean,
  context?: Element,
) {
  return new Target<JSX.Element>(
    el,
    (item) => {
      // TODO: should be a oncreate callback?
      if (item && typeof item === 'object' && 'key' in item)
        item['attrs']['_'] = {
          ...(item['attrs']['_'] ?? {}),
          $key: item.key,
        };
      return item;
    },
    isSVG,
    isMATHML,
    context,
  );
}

export function mapFind<K, V>(
  map: Map<K, V>,
  callback: (value: V) => boolean,
): [K, V] | undefined {
  for (const [key, value] of map) {
    if (callback(value)) return [key, value];
  }
  return undefined;
}

export const ListFactory: Required<ElementFactory> = {
  compare(el: Element): boolean {
    return el.localName === ListElement.tag;
  },
  create(
    jsx: JSX.Element[],
    isSVG?: boolean,
    isMATHML?: boolean,
    self?: Element,
  ) {
    const el: HTMLElement | SVGElement = isSVG
      ? document.createElementNS('http://www.w3.org/2000/svg', ListElement.tag)
      : document.createElement(ListElement.tag);
    createTarget(el, isSVG, isMATHML, self).appendItems(...jsx);
    return el;
  },
  update(
    jsx: JSX.Element[],
    el: ParentNode,
    isSVG?: boolean,
    isMATHML?: boolean,
    contextElement?: MichiCustomElement,
  ) {
    const newLength = jsx.length;
    if (newLength === 0) el.textContent = '';
    else {
      const pendingToInsertKeyedItems: {
        index: number;
        newChildJSX: JSX.Element;
        key: string | number;
      }[] = [];
      const pendingToReplaceKeyedItems = new Map<
        number,
        { key?: string | number; child: ChildNode }
      >();
      const replacedKeyedItems = new Map<string | number, ChildNode>();
      const removedKeyedItems = new Map<string | number, ChildNode>();
      const target = createTarget(el, isSVG, isMATHML, contextElement);

      // Walk thought the current children
      const nextIndex = forEachChildren(el.firstChild, (currentNode, i) => {
        if (i < newLength) {
          const newChildJSX = jsx[i];
          if (nodeNodeIsSameElement(currentNode, newChildJSX))
            target.updateNode(currentNode, newChildJSX);
          else {
            if (jsxIsIterable(newChildJSX)) {
              pendingToReplaceKeyedItems.set(i, {
                key: currentNode.$key,
                child: currentNode,
              });
              pendingToInsertKeyedItems.push({
                index: i,
                key: newChildJSX.key,
                newChildJSX,
              });
            } else {
              if (currentNode.$key)
                replacedKeyedItems.set(currentNode.$key, currentNode);
              target.replaceNode(currentNode, newChildJSX);
            }
          }
        } else {
          if (currentNode.$key)
            removedKeyedItems.set(currentNode.$key, currentNode);
          currentNode.remove();
          return true;
        }
      });

      // moved nodes on previously walked elements
      pendingToInsertKeyedItems.forEach(({ index, newChildJSX, key }) => {
        // Cannot be null because the index is the same than pendingToInsertKeyedItems
        const nodeInThePlace = pendingToReplaceKeyedItems.get(index)!;

        let itemFound = replacedKeyedItems.get(key);
        if (itemFound) replacedKeyedItems.delete(key);
        else {
          itemFound = removedKeyedItems.get(key);
          if (itemFound) removedKeyedItems.delete(key);
          else {
            const itemFoundInPendingToReplaceKeyedItems = mapFind(
              pendingToReplaceKeyedItems,
              (value) => value.key === key,
            );
            if (itemFoundInPendingToReplaceKeyedItems) {
              const result = itemFoundInPendingToReplaceKeyedItems;
              itemFound = result[1].child;

              const tempChild = document.createComment('');
              result[1].child.replaceWith(tempChild);
              result[1].child = tempChild;
            }
          }
        }
        pendingToReplaceKeyedItems.delete(index);
        if (nodeInThePlace.key)
          replacedKeyedItems.set(nodeInThePlace.key, nodeInThePlace.child);
        if (itemFound) {
          update(itemFound, newChildJSX, isSVG, isMATHML, contextElement);
          nodeInThePlace.child.replaceWith(itemFound);
        } else {
          target.replaceNode(nodeInThePlace.child, newChildJSX);
        }
      });

      // new nodes
      const pendingChildren = jsx.slice(nextIndex);
      if (replacedKeyedItems.size > 0 || removedKeyedItems.size > 0)
        target.insertChildNodesAt(
          nextIndex,
          ...pendingChildren.map((newChildJSX) => {
            if (jsxIsIterable(newChildJSX)) {
              const itemFound =
                replacedKeyedItems.get(newChildJSX.key) ||
                removedKeyedItems.get(newChildJSX.key);
              if (itemFound) return itemFound;
            }
            return target.createSingleItem(newChildJSX);
          }),
        );
      else target.insertItemsAt(nextIndex, ...pendingChildren);
    }
  },
};
