import type { CSSProperties } from "@michijs/htmltype";
import { AnyObject, EventListenerMap } from "../../types";
import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { compareAttributes } from "./compareAttributes";
import { bindFunction } from "../../utils/bindFunction";

export function setAttributes(
  el: Element,
  attributes: AnyObject,
  self?: Element,
) {
  let events: EventListenerMap | undefined;
  Object.entries(attributes).forEach(([name, newValue]) => {
    // priority to properties and events
    if (name === "_") {
      Object.entries(newValue).forEach(([propertyName, value]) => {
        el[propertyName] = value;
        if (value.subscribe)
          value.subscribe((newValue) => (el[propertyName] = newValue));
      });
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2) as keyof ElementEventMap;
      const bindedEvent = bindFunction(self, newValue);
      el.addEventListener(eventName, bindedEvent);
      // if (!events) events = new Map();
      // events.set(eventName, newValue);
    } else if (name === "style") {
      setStyle(el, newValue as CSSProperties);
    } else if (!compareAttributes(el, name, newValue)) {
      setAttribute(el, name, newValue);
      if (newValue.subscribe)
        newValue.subscribe((newValue) => setAttribute(el, name, newValue));
    }
  });
  if (events) el.$setEventListeners(self, events);
}
