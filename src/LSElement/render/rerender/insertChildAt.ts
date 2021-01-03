export function insertChildAt(parent: Node, index: number, newChild: Node) {
  if (!index)
    index = 0;
  if (index >= parent.childNodes.length) {
    parent.appendChild(newChild);
  } else {
    parent.insertBefore(newChild, parent.childNodes[index]);
  }
}
