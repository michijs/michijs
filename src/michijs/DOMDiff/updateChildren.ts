import { MichiCustomElement } from '../types';
import { update } from './update';
import { create } from './create';

export async function updateChildren(el: ParentNode, children: JSX.Element[], isSVG?: boolean, self?: MichiCustomElement) {
  // TODO: when using a custom element wihout shadow root?
  let currentNode = el.firstChild;
  let i = 0;
  while (currentNode) {
    const nextSibling = currentNode.nextSibling;
    if (i < children.length) {
      const x = children[i];
      update(currentNode, x, isSVG, self);
    } else
      currentNode.remove();
    currentNode = nextSibling;
    i++;
  }
  try {
    el.append(...children.slice(i).map(x => create(x, isSVG, self)));
  } catch (e) {
    console.error(e)
  }
}