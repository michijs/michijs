export const isElement = (
  el: Element | ParentNode | ChildNode | Node,
): el is Element => "setAttribute" in el;
