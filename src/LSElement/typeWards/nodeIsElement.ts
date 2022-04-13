export function nodeIsElement(node: ChildNode): node is Element {
  return node.nodeType === 1;
}