import type { EventsPort, EventDispatcherPort } from "../../ports/events.port";

export class BrowserEventsAdapter implements EventsPort {
  createEvent(type: string, options?: EventInit): Event {
    return new Event(type, options);
  }

  createCustomEvent<T = any>(
    type: string,
    detail?: T,
    options?: CustomEventInit<T>,
  ): CustomEvent<T> {
    return new CustomEvent(type, { ...options, detail });
  }

  dispatchEvent(target: EventTarget, event: Event): boolean {
    return target.dispatchEvent(event);
  }
}

export class EventDispatcher<T = any> implements EventDispatcherPort<T> {
  private listeners = new Set<(detail: T) => void>();

  dispatch(detail: T): void {
    for (const listener of Array.from(this.listeners)) {
      try {
        listener(detail);
      } catch (error) {
        console.error("Event listener error:", error);
      }
    }
  }

  subscribe(callback: (detail: T) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
}
