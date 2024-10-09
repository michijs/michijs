export function setAttribute(
  element: Element | HTMLElement,
  key: string,
  newValue: any,
): void {
  const value = newValue?.valueOf();
  switch (true) {
    case value === null:
    case value === undefined:
    case typeof value === "boolean": {
      if (value) element.setAttribute(key, "");
      else element.removeAttribute(key);
      break;
    }
    case typeof value === "object": {
      if (value instanceof URL) element.setAttribute(key, value.href);
      else element.setAttribute(key, JSON.stringify(value));
      break;
    }
    default: {
      element.setAttribute(key, value);
    }
  }
}
