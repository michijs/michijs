import { EventListenerMap } from '../types';
import { bindFunction } from '../utils/bindFunction';

Element.prototype.$setEventListeners = function (this: Element, src, events) {
  // New events
  if (events.size > 0) {
    if (!this.$eventListenerList)
      this.$eventListenerList = new Map();

    // Updating 
    if (this.$eventListenerList.has(src)) {
      // console.log(src)
      const currentMap = this.$eventListenerList.get(src);
      events.forEach((newEvent, key) => {
        const { originalEvent, bindedEvent } = currentMap.get(key);
        if (originalEvent != newEvent) {
          if (originalEvent)
            this.removeEventListener(key, bindedEvent);
          const bindedNewEvent = bindFunction(src, newEvent);
          this.addEventListener(key, bindedNewEvent);
          currentMap.set(key, { originalEvent: newEvent, bindedEvent: bindedNewEvent });
        }
      });
      // Remove unexistent events
      if (events.size !== currentMap.size) {
        currentMap.forEach((x, key) => {
          if (!events.has(key)) {
            this.removeEventListener(key, x.bindedEvent);
            currentMap.delete(key);
          }
        });
      }

    } else {//Add new events
      const newEvents: EventListenerMap = new Map();
      events.forEach((originalEvent, key) => {
        const bindedEvent = bindFunction(src, originalEvent);
        newEvents.set(key, { originalEvent, bindedEvent });
        this.addEventListener(key, bindedEvent);
      });
      this.$eventListenerList.set(src, newEvents);
    }
    // Remove all events
  } else if (this.$eventListenerList?.has(src)) {
    this.$eventListenerList.get(src).forEach((x, key) => this.removeEventListener(key, x.bindedEvent));
    this.$eventListenerList.delete(src);
  }
};