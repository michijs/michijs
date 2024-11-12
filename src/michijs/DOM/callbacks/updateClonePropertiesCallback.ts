import { bindObservableToRef } from "../../utils";

const updateClonePropertyCallback = (propertyName: string) => (newValue: unknown, el: Element) => {if (el[propertyName] !== newValue)el[propertyName] = newValue};

export const updateClonePropertiesCallback = (el: Element) => ([propertyName, value]) => bindObservableToRef(
  value,
  el,
  updateClonePropertyCallback(propertyName)
);
