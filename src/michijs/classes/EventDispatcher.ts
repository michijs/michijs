export class EventDispatcher<T> {
  private name: string;
  private eventInit?: EventInit;

  constructor(eventInit?: EventInit) {
    this.eventInit = eventInit;
  }

  public init(name: string): void {
    this.name = name.toLowerCase();
  }

  public dispatch(targetElement: Element, detail?: T): boolean {
    const event = new CustomEvent<T>(this.name, {
      ...this.eventInit,
      detail: detail?.valueOf() as T | undefined,
    });
    return targetElement.dispatchEvent(event);
  }
}
