import { bindObservableToRef } from "../../utils";
const updatePropertyCallback =
  (propertyName: string) => (newValue: unknown, el: Element) =>
    (el[propertyName] = newValue);

export const updatePropertiesCallback =
  (el: Element) =>
  ([propertyName, value]) =>
    bindObservableToRef(value, el, updatePropertyCallback(propertyName));
