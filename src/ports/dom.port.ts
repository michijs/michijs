export interface DOMPort {
  createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
  createTextNode(text: string): Text;
  setAttribute(element: HTMLElement, name: string, value: string): void;
  getAttribute(element: HTMLElement, name: string): string | null;
  removeAttribute(element: HTMLElement, name: string): void;
  addEventListener(
    element: HTMLElement,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    element: HTMLElement,
    event: string,
    handler: EventListener,
    options?: boolean | EventListenerOptions,
  ): void;
  appendChild(parent: HTMLElement, child: Node): void;
  removeChild(parent: HTMLElement, child: Node): void;
  replaceChild(parent: HTMLElement, newChild: Node, oldChild: Node): void;
  insertBefore(
    parent: HTMLElement,
    newChild: Node,
    refChild: Node | null,
  ): void;
  getShadowRoot(element: HTMLElement): ShadowRoot | null;
  attachShadow(element: HTMLElement, options: ShadowRootInit): ShadowRoot;
  querySelector(element: HTMLElement, selector: string): Element | null;
  querySelectorAll(element: HTMLElement, selector: string): NodeListOf<Element>;
}
