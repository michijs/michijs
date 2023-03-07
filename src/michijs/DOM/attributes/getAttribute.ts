import { getAttributeValue } from './getAttributeValue';

export function getAttribute(
  element: Element | HTMLElement,
  key: string,
  self?: Element,
) {
  if (key === 'style') return element[key];
  else if (key.startsWith('on'))
    return element.$eventListenerList?.get(self)?.get(key.slice(2));

  return getAttributeValue(element.getAttribute(key));
}
