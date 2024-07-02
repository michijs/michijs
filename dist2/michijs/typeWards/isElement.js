/**
 * @param {Element | ParentNode | ChildNode} el
 * @returns {el is Element}
 */
export function isElement(el) {
  return "setAttribute" in el;
}
