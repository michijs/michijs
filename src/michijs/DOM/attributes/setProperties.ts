import type { AnyObject, CreateOptions } from "../../types";
import { setProperty } from "./setProperty";

export function setProperties(
  el: Element,
  attributes: AnyObject,
  options?: CreateOptions,
): void {
  Object.entries(attributes).forEach(([name, newValue]) =>
    setProperty(el, name, newValue, options),
  );
}
