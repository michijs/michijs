import { EventListenerMap } from '../types';
import { bindFunction } from '../utils/bindFunction';

Element.prototype.$setEventListeners = function (this: Element, src, events) {
  // New events
  if (events.size > 0) {
    if (!this.$eventListenerList) this.$eventListenerList = new Map();
    // Updating
    if (this.$eventListenerList.has(src)) {
      const currentMap = this.$eventListenerList.get(src);
      events.forEach((newEvent, key) => {
        const originalEvent = currentMap?.get(key);
        if (originalEvent !== newEvent) {
          if (originalEvent) this.removeEventListener(key, originalEvent);
          this.addEventListener(key, newEvent);
          currentMap?.set(key, newEvent);
        }
      });
      // Remove unexistent events
      if (events.size !== currentMap?.size) {
        currentMap?.forEach((x, key) => {
          if (!events.has(key)) {
            this.removeEventListener(key, x);
            currentMap.delete(key);
          }
        });
      }
    } else {
      //Add new events
      const bindedEvents: EventListenerMap = new Map();
      events.forEach((newEvent, key) => {
        const bindedEvent = bindFunction(src, newEvent);
        this.addEventListener(key, bindedEvent);
        bindedEvents.set(key, bindedEvent);
      });
      this.$eventListenerList.set(src, bindedEvents);
    }
    // Remove all events
  } else if (this.$eventListenerList?.has(src)) {
    this.$eventListenerList
      ?.get(src)
      ?.forEach((x, key) => this.removeEventListener(key, x));
    this.$eventListenerList.delete(src);
  }
};
