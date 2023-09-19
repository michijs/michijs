import { CreateOptions } from "../../types";
import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { compareAttributes } from "./compareAttributes";
import { bindFunction } from "../../utils/bindFunction";
import { bindObservable } from "../../utils";
import type { CSSProperties } from "@michijs/htmltype";


export function setProperty(
  el: Element,
  name: string, 
  newValue: any,
  options?: CreateOptions,
){
  // priority to properties and events
  if (name === "_")
    Object.entries(newValue).forEach(([propertyName, value]) =>
      bindObservable(value, (newValue) => (el[propertyName] = newValue)),
    );
  else if (name.startsWith("on")) {
    const eventName = name.slice(2) as keyof ElementEventMap;
    const bindedEvent = bindFunction(options?.contextElement, newValue);
    el.addEventListener(eventName, bindedEvent);
  } else if (name === "style" && typeof newValue === "object")
    setStyle(el, newValue as CSSProperties);
  else if (!compareAttributes(el, name, newValue))
    bindObservable(newValue, (newValue) => setAttribute(el, name, newValue));
}