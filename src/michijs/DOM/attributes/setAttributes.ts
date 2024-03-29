import type { CSSProperties } from "@michijs/htmltype";
import { AnyObject, EventListenerMap } from "../../types";
import { deepEqual } from "../../utils/deepEqual";
import { setStyle } from "./setStyle";
import { setAttribute } from "./setAttribute";
import { compareAttributes } from "./compareAttributes";

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
        if (!deepEqual(el[propertyName], value)) el[propertyName] = value;
      });
    } else if (name.startsWith("on")) {
      const eventName = name.slice(2) as keyof ElementEventMap;
      if (!events) events = new Map();
      events.set(eventName, newValue);
    } else if (name === "style") {
      setStyle(el, newValue as CSSProperties);
    } else if (!compareAttributes(el, name, newValue)) {
      setAttribute(el, name, newValue);
    }
  });
  if (events) el.$setEventListeners(self, events);
}
