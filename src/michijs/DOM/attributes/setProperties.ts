import type { AnyObject } from "../../types";
import { setProperty } from "./setProperty";

export function setProperties(
  el: Element,
  attributes: AnyObject,
  contextElement?: Element,
): void {
  Object.entries(attributes).forEach(([name, newValue]) =>
    setProperty(el, name, newValue, contextElement),
  );
}
