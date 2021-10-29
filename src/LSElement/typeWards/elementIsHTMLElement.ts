export function elementIsHTMLElement(element: HTMLElement | Element): element is HTMLElement {
  return element['style'];
}
