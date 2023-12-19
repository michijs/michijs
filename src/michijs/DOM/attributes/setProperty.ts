import { CreateOptions } from "../../types";
import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservable } from "../../utils";
import type { CSSProperties } from "../../generated/htmlType";
import { isMichiCustomElement } from "../../typeWards/isMichiCustomElement";

export function setProperty(
  el: Element,
  name: string,
  newValue: any,
  options?: CreateOptions,
) {
  // priority to properties and events
  if (name === "_")
    Object.entries(newValue).forEach(([propertyName, value]) =>
      bindObservable(value, (newValue) => {
        el[propertyName] = newValue;
      }),
    );
  else if (name.startsWith("on")) {
    const eventName = name.slice(2) as keyof ElementEventMap;
    const bindedEvent = bindFunction(options?.contextElement, newValue);
    el.addEventListener(eventName, bindedEvent);
  } else if (name === "style" && typeof newValue === "object")
    setStyle(el, newValue as CSSProperties);
  else if (
    name === "class" &&
    isMichiCustomElement(el) &&
    el.$michi.styles.className
  )
    bindObservable(newValue, (newValue) => {
      const newValueWithClassName = `${newValue} ${el.$michi.styles.className}`;
      setAttribute(el, name, newValueWithClassName);
    });
  else bindObservable(newValue, (newValue) => setAttribute(el, name, newValue));
}
