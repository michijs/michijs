export const isHTMLElement = (
  el: Element | ParentNode | ChildNode | Node,
): el is HTMLElement => "style" in el;
