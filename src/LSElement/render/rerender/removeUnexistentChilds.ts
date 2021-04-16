export function removeUnexistentChilds(parent: HTMLElement, newChildrenLength: number) {
  const childNodes = parent.childNodes;
  if (newChildrenLength < childNodes.length) {
    const childsToRemove = Array.from(childNodes).slice(newChildrenLength, childNodes.length);
    childsToRemove.forEach(childToRemove => parent.removeChild(childToRemove));
  }
}
