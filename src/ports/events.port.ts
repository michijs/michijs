export interface EventsPort {
  createEvent(type: string, options?: EventInit): Event;
  createCustomEvent<T = any>(
    type: string,
    detail?: T,
    options?: CustomEventInit<T>,
  ): CustomEvent<T>;
  dispatchEvent(target: EventTarget, event: Event): boolean;
}

export interface EventDispatcherPort<T = any> {
  dispatch(detail: T): void;
  subscribe(callback: (detail: T) => void): () => void;
}
