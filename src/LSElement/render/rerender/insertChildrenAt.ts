export function insertChildrenAt(parent: Node, newChildren: Node | string | (Node | string)[], index?: number) {
  if(!index)
    index = 0;

  const newChild = Array.isArray(newChildren) ? newChildren : [newChildren];
  if (index >= parent.childNodes.length) {
    (parent as DocumentFragment).append(...newChild);
  } else {
    const fragment = document.createDocumentFragment();
    fragment.append(...newChild);
    parent.insertBefore(fragment, parent.childNodes[index]);
  }
}
