import { MichiCustomElement } from "../types";
import { update } from "./update";
import { create } from "./create";
import { forEachChildren } from "./forEachChildren";

export async function updateChildren(
  el: ParentNode,
  children: JSX.Element[],
  isSVG?: boolean,
  isMATHML?: boolean,
  self?: MichiCustomElement,
) {
  const childrenLength = children.length;
  const j = forEachChildren(el.firstChild, (currentNode, i) => {
    if (i < childrenLength) {
      const x = children[i];
      update(currentNode, x, isSVG, isMATHML, self);
    } else currentNode.remove();
  });
  try {
    el.append(
      ...children.slice(j).map((x) => create(x, isSVG, isMATHML, self)),
    );
  } catch (e) {
    console.error(e);
  }
}
