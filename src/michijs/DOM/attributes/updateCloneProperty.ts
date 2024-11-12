import { setStyle } from "./setStyle";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservableToRef } from "../../utils/bindObservableToRef";
import type { CSSProperties } from "../../generated/htmlType";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";
import { updateClassCallback } from "../callbacks/updateClassCallback";
import { updateAttributeCallback } from "../callbacks/updateAttributeCallback";
import { updateClonePropertiesCallback } from "../callbacks/updateClonePropertiesCallback";

export function updateCloneProperty(
  el: Element,
  name: string,
  newValue: any,
  contextElement?: Element,
): void {
  // priority to properties and events
  if (name === "_")
    return Object.entries(newValue).forEach(updateClonePropertiesCallback(el));
  if (name.startsWith("on")) {
    const eventName = name.slice(2) as keyof ElementEventMap;
    const bindedEvent = bindFunction(contextElement, newValue);
    el.addEventListener(eventName, bindedEvent);
    return;
  }
  if (name === "style" && typeof newValue === "object")
    return setStyle(el, newValue as CSSProperties);
  if (
    name === "class" &&
    isMichiCustomElement(el) &&
    el.$michi.styles.className
  )
    return bindObservableToRef(newValue, el, updateClassCallback);
  return bindObservableToRef(newValue, el, updateAttributeCallback(name));
}
