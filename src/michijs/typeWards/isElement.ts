export function isElement(
  el: Element | ParentNode | ChildNode | Node,
): el is Element {
  return "setAttribute" in el;
}
