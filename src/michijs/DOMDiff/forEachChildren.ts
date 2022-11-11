export const forEachChildren = (initialNode: ChildNode, callback: (childNode: ChildNode, index: number) => void) => {
  let currentNode = initialNode;
  let i = 0;
  while (currentNode) {
    const nextSibling = currentNode.nextSibling;
    if (!currentNode.$ignore) {
      callback(currentNode, i);
      i++;
    }
    currentNode = nextSibling;
  }
  return i;
};