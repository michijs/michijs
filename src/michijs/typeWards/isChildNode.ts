export function isChildNode(
  node: Node,
): node is ChildNode {
  return "replaceWith" in node;
}
