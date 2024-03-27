export class EventDispatcher<T> {
  private name: string;

  constructor(private eventInit?: EventInit) {}

  public init(name: string) {
    this.name = name.toLowerCase();
  }

  public dispatch(targetElement: Element, detail?: T) {
    const event = new CustomEvent<T>(this.name, {
      ...this.eventInit,
      detail: detail?.valueOf() as T | undefined,
    });
    return targetElement.dispatchEvent(event);
  }
}
