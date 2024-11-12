import type { AnyObject } from "../../types";
import { updateCloneProperty } from "./updateCloneProperty";

export function updateCloneProperties(
  el: Element,
  attributes: AnyObject,
  contextElement?: Element,
): void {
  Object.entries(attributes).forEach(([name, newValue]) =>
    updateCloneProperty(el, name, newValue, contextElement),
  );
}
