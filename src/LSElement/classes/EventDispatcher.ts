export class EventDispatcher<T>{
    private name: string;
    private eventInit: EventInit;

    constructor(eventInit?: EventInit) {
      this.eventInit = eventInit;
    }

    public init(name: string) {
      this.name = name.toLowerCase();
    }

    public dispatch(targetElement: Element, detail?: T) {
      const event = new CustomEvent<T>(this.name, { ...this.eventInit, detail });
      return targetElement.dispatchEvent(event);
    }
}