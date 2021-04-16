import { ObjectJSXElement } from '../../types';

export function tagsAreDifferent(newChildMap: ObjectJSXElement, element: Element) {
  return newChildMap.tag.toLowerCase() !== element.tagName.toLowerCase();
}
