/**
 *
 * @returns A boolean indicating if the current node should be ignored in the count of children
 * @typedef {(childNode: ChildNode, index: number) => void} ForEachChildrenCallback
 */

/**
 * @param {ChildNode | null} initialNode
 * @param {ForEachChildrenCallback} callback
 * @param {(currentNode: ChildNode | null) => any} [shouldContinueCallback=(
 *     currentNode: ChildNode | null,
 *   ) => currentNode]
 * @returns {number}
 */
export const forEachChildren = (initialNode, callback, shouldContinueCallback = (currentNode) => currentNode) => {
    let i = 0;
    if (initialNode) {
        let currentNode = initialNode;
        while (currentNode && shouldContinueCallback(currentNode)) {
            const nextSibling = currentNode.nextSibling;
            callback(currentNode, i);
            i++;
            currentNode = nextSibling;
        }
    }
    return i;
};
