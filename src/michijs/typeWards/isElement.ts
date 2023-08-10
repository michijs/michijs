export function isElement(el: Element | ParentNode | ChildNode): el is Element {
  return "setAttribute" in el;
}
