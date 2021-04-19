import { ObjectJSXElement } from '../types';

export function tagsAreDifferent(objectJSXElement: ObjectJSXElement, element: Element) {
  return objectJSXElement.tag !== element.localName;
}
