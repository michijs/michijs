import { deepEqual } from '../utils/deepEqual';

Element.prototype.setEventListeners = function (this: Element, src, events) {
  // New events
  if (events.size > 0) {
    if (!this.eventListenerList)
      this.eventListenerList = new Map();

    // Updating 
    if (this.eventListenerList.has(src)) {
      const currentMap = this.eventListenerList.get(src);
      events.forEach((newEventListener, key) => {
        const currentEventListener = currentMap.get(key);
        if (!deepEqual(currentEventListener, newEventListener)) {
          if (currentEventListener)
            this.removeEventListener(key, currentEventListener);
          this.addEventListener(key, newEventListener);
          currentMap.set(key, newEventListener);
        }
      });
      // Remove unexistent events
      if (events.size !== currentMap.size) {
        currentMap.forEach((x, key) => {
          if (!events.has(key)) {
            this.removeEventListener(key, x);
            currentMap.delete(key);
          }
        });
      }

    } else {//Add new events
      this.eventListenerList.set(src, events);
      events.forEach((x, key) => this.addEventListener(key, x));
    }
    // Remove all events
  } else if (this.eventListenerList?.has(src)) {
    this.eventListenerList.get(src).forEach((x, key) => this.removeEventListener(key, x));
    this.eventListenerList.delete(src);
  }
};