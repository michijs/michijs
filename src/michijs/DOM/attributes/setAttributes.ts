import { Attributes } from '@lsegurado/htmltype';
import { AnyObject, EventListenerMap } from '../../types';
import { deepEqual } from '../../utils/deepEqual';
import { setStyle } from './setStyle';
import { setAttribute } from './setAttribute';
import { compareAttributes } from './compareAttributes';

export function setAttributes(el: Element, attributes: AnyObject, self?: Element) {
  let events: EventListenerMap | undefined;
  Object.entries(attributes).forEach(([name, newValue]) => {
    // priority to properties and events
    if (name.startsWith('_')) {
      const propertyName = name.substring(1);
      if (!deepEqual(el[propertyName], newValue))
        el[propertyName] = newValue;
    } else if (name.startsWith('on')) {
      const eventName = name.slice(2) as keyof ElementEventMap;
      if (!events)
        events = new Map();
      events.set(eventName, newValue);
    } else if (name === 'style') {
      setStyle(el, newValue as Attributes.CSSProperties);
    } else if (!compareAttributes(el, name, newValue)) {
      setAttribute(el, name, newValue);
    }
  });
  if (events)
    el.$setEventListeners(self, events);
}