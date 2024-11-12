import { setAttribute } from "../attributes/setAttribute";

export const updateAttributeCallback = (propertyName: string) => (newValue, el) => setAttribute(el, propertyName, newValue);
