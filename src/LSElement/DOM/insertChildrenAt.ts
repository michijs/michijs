export function insertChildrenAt(parent: Node, newChildren: (Node | string)[], index?: number) {
  if(!index)
    index = 0;

  if (!parent.hasChildNodes() || index >= parent.childNodes.length) {
    (parent as DocumentFragment).append(...newChildren);
  } else {
    const fragment = document.createDocumentFragment();
    fragment.append(...newChildren);
    parent.insertBefore(fragment, parent.childNodes.item(index));
  }
}
