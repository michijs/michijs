import { bindObservableToRef } from "../../utils";
const updatePropertyCallback = (propertyName: string) => (newValue: unknown, el: Element) => { 
  el[propertyName] = newValue 
};

export const updatePropertiesCallback = (el: Element, shouldValidateInitialValue?: boolean) => ([propertyName, newValue]) => bindObservableToRef(
  newValue,
  el,
  updatePropertyCallback(propertyName),
  shouldValidateInitialValue && el[propertyName] === newValue.valueOf()
);
