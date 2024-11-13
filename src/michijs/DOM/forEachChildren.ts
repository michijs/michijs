/**
 *
 * @returns A boolean indicating if the current node should be ignored in the count of children
 */
interface ForEachChildrenCallback {
  (childNode: ChildNode, index: number): void;
}

export const forEachChildren = (
  currentNode: ChildNode | null,
  callback: ForEachChildrenCallback,
  shouldStopCallback?: (currentNode: ChildNode | null) => any,
): number => {
  let i = 0;
  while (currentNode && !shouldStopCallback?.(currentNode)) {
    const nextSibling = currentNode.nextSibling;
    callback(currentNode, i);
    i++;
    currentNode = nextSibling;
  }
  return i;
};
