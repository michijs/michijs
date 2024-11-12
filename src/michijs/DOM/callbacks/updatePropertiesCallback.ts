import { bindObservableToRef } from "../../utils";
import { updatePropertyCallback } from "./updatePropertyCallback";

export const updatePropertiesCallback =
  (el: Element) =>
  ([propertyName, value]) =>
    bindObservableToRef(value, el, updatePropertyCallback(propertyName));
