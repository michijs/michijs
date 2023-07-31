/**
 *
 * @returns A boolean indicating if the current node should be ignored in the count of children
 */
type ForEachChildrenCallback = (
  childNode: ChildNode,
  index: number,
) => void | boolean;

export const forEachChildren = (
  initialNode: ChildNode | null,
  callback: ForEachChildrenCallback,
  shouldContinueCallback: (currentNode: ChildNode | null) => any = (currentNode: ChildNode | null) => currentNode
) => {
  let i = 0;
  if (initialNode) {
    let currentNode: ChildNode | null = initialNode;
    while (currentNode && shouldContinueCallback(currentNode)) {
      const nextSibling = currentNode.nextSibling;
      if (!currentNode.$ignore) {
        if (!callback(currentNode, i)) i++;
      }
      currentNode = nextSibling;
    }
  }
  return i;
};
