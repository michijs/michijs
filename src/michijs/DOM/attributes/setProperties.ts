import { AnyObject, CreateOptions } from "../../types";
import { setProperty } from "./setProperty";

export function setProperties(
  el: Element,
  attributes: AnyObject,
  options?: CreateOptions,
) {
  Object.entries(attributes).forEach(([name, newValue]) =>
    setProperty(el, name, newValue, options),
  );
}
