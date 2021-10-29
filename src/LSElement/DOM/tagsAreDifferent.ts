export function tagsAreDifferent(jsxElementTag: string, element: Element) {
  return jsxElementTag !== element.localName;
}