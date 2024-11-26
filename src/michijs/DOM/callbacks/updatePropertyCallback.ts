export const updatePropertyCallback =
  (propertyName: string) => (newValue: unknown, el: Element) => {
    el[propertyName] = newValue;
  };
