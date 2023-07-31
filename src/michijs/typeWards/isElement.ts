export function isElement(
  el: Element | ParentNode,
): el is Element {
  return "setAttribute" in el;
}
