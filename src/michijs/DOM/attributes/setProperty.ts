import { CreateOptions } from "../../types";
import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservableToRef } from "../../utils";
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
      bindObservableToRef(
        value,
        el,
        (newValue, el) => (el[propertyName] = newValue),
      ),
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
    bindObservableToRef(newValue, el, (newValue, el) => {
      const newValueWithClassName = `${newValue} ${el.$michi.styles.className}`;
      setAttribute(el, name, newValueWithClassName);
    });
  else
    bindObservableToRef(newValue, el, (newValue, el) =>
      setAttribute(el, name, newValue),
    );
}
