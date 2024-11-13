import { setStyle } from "./setStyle";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservableToRef } from "../../utils/bindObservableToRef";
import type { CSSProperties } from "../../generated/htmlType";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";
import { updateClassCallback } from "../callbacks/updateClassCallback";
import { updateAttributeCallback } from "../callbacks/updateAttributeCallback";
import { updatePropertiesCallback } from "../callbacks/updatePropertiesCallback";

export function updateCloneProperty(
  el: Element,
  name: string,
  newValue: any,
  contextElement?: Element,
): void {
  // priority to properties and events
  if (name === "_")
    return Object.entries(newValue).forEach(updatePropertiesCallback(el, true));
  if (name.startsWith("on"))
    return el.addEventListener(name.slice(2), bindFunction(contextElement, newValue));
  if (name === "style" && typeof newValue === "object")
    return setStyle(el, newValue as CSSProperties);
  if (
    name === "class" &&
    isMichiCustomElement(el) &&
    el.$michi.styles.className
  )
    return bindObservableToRef(newValue, el, updateClassCallback);
  // TODO: Validation needs to be improved
  return bindObservableToRef(newValue, el, updateAttributeCallback(name), el.getAttribute(name) === newValue.valueOf());
}
