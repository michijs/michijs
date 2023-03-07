export function setAttribute(
  element: Element | HTMLElement,
  key: string,
  newValue: any,
) {
  switch (true) {
    case newValue === null:
    case newValue === undefined:
    case typeof newValue === 'boolean': {
      if (newValue) element.setAttribute(key, '');
      else element.removeAttribute(key);
      break;
    }
    case typeof newValue === 'object': {
      element.setAttribute(key, JSON.stringify(newValue));
      break;
    }
    default: {
      element.setAttribute(key, newValue);
    }
  }
}
