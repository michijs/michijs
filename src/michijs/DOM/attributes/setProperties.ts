import type { AnyObject } from "../../types";
import { setProperty } from "./setProperty";

export function setProperties(
  el: Element,
  attributes: AnyObject,
  contextElement?: Element,
  shouldValidateInitialValue?: boolean,
): void {
  for (const [name, newValue] of Object.entries(attributes))
    setProperty(el, name, newValue, contextElement, shouldValidateInitialValue);
}
