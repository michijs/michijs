export interface VirtualFragmentPort extends Pick<
  ParentNode,
  | "textContent"
  | "prepend"
  | "append"
  | "replaceChildren"
  | "firstChild"
  | "lastChild"
  | "appendChild"
  | "insertBefore"
  | "childElementCount"
>,
  Pick<ChildNode, "remove"> {
  childNodes: ChildNode[]
}