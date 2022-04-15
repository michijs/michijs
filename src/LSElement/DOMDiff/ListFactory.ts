import { ElementFactory, LSCustomElement } from '../..';
import { nodeIsElement } from '../typeWards/nodeIsElement';
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
      const removedElements = new Array<Element>();
      const target = this.createTarget(el, self);

      this.jsx.forEach((newChildJSX, i) => {
        const currentNode = el.childNodes.item(i);
        if (currentNode) {
          if (nodeNodeIsSameElement(currentNode, newChildJSX)) {
            update(currentNode, newChildJSX, isSVG, self);
          } else {
            currentNode.remove();
            if (typeof newChildJSX === 'object' && 'key' in newChildJSX) {// Find the node 
              // Find the node in removed elements
              const removedElementIndex = removedElements.findIndex(x => x.key === newChildJSX.key);
              let nodeFound: ChildNode;
              let needsToBeMoved = true;
              if (removedElementIndex === -1) {
                // Find the node thought the children
                const elementCount = el.childElementCount;
                for (let j = i; j < elementCount; j++) {
                  const node = el.childNodes.item(j);
                  if (node.key === newChildJSX.key) {
                    nodeFound = node;
                    needsToBeMoved = j !== i;
                    break;
                  }
                }
              } else
                nodeFound = removedElements.splice(removedElementIndex, 1)[0];

              if (nodeIsElement(currentNode) && currentNode.key)
                removedElements.push(currentNode);

              if (nodeFound) {
                if (needsToBeMoved)
                  target.insertChildNodesAt(i, nodeFound);
                update(nodeFound, newChildJSX, isSVG, self);
              } else
                target.insertChildNodesAt(i, target.renderSingleItem(newChildJSX, i));
            } else
              target.insertChildNodesAt(i, target.renderSingleItem(newChildJSX, i));

            if (nodeIsElement(currentNode))
              removedElements.push(currentNode);
          }
        } else
          target.insertChildNodesAt(i, target.renderSingleItem(newChildJSX, i));

      });
      let leftoverChild = el.childNodes.item(this.jsx.length);
      // Remove leftover children
      while (leftoverChild) {
        leftoverChild.remove();
        leftoverChild = el.childNodes.item(this.jsx.length);
      }
    }
  }
}
