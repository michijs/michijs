export function setAttribute(
  element: Element | HTMLElement,
  key: string,
  newValue: any,
): void {
  const value = newValue?.valueOf();
  if (value === null || value === undefined)
    return element.removeAttribute(key);
  removeBooleanAndObjectAttributes: {
    const typeofValue = typeof value;
    if (typeofValue === "boolean")
      return value
        ? element.setAttribute(key, "")
        : element.removeAttribute(key);
    if (typeofValue === "object")
      return value instanceof URL
        ? element.setAttribute(key, value.href)
        : element.setAttribute(key, JSON.stringify(value));
  }
  return element.setAttribute(key, value);
}
