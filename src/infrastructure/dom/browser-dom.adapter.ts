import type { DOMPort } from "../../ports/dom.port";

export class BrowserDOMAdapter implements DOMPort {
  createElement(
    tagName: string,
    options?: ElementCreationOptions,
  ): HTMLElement {
    return document.createElement(tagName, options);
  }

  createTextNode(text: string): Text {
    return document.createTextNode(text);
  }

  setAttribute(element: HTMLElement, name: string, value: string): void {
    element.setAttribute(name, value);
  }

  getAttribute(element: HTMLElement, name: string): string | null {
    return element.getAttribute(name);
  }

  removeAttribute(element: HTMLElement, name: string): void {
    element.removeAttribute(name);
  }

  addEventListener(
    element: HTMLElement,
    event: string,
    handler: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void {
    element.addEventListener(event, handler, options);
  }

  removeEventListener(
    element: HTMLElement,
    event: string,
    handler: EventListener,
    options?: boolean | EventListenerOptions,
  ): void {
    element.removeEventListener(event, handler, options);
  }

  appendChild(parent: HTMLElement, child: Node): void {
    parent.appendChild(child);
  }

  removeChild(parent: HTMLElement, child: Node): void {
    parent.removeChild(child);
  }

  replaceChild(parent: HTMLElement, newChild: Node, oldChild: Node): void {
    parent.replaceChild(newChild, oldChild);
  }

  insertBefore(
    parent: HTMLElement,
    newChild: Node,
    refChild: Node | null,
  ): void {
    parent.insertBefore(newChild, refChild);
  }

  getShadowRoot(element: HTMLElement): ShadowRoot | null {
    return element.shadowRoot;
  }

  attachShadow(element: HTMLElement, options: ShadowRootInit): ShadowRoot {
    return element.attachShadow(options);
  }

  querySelector(element: HTMLElement, selector: string): Element | null {
    return element.querySelector(selector);
  }

  querySelectorAll(
    element: HTMLElement,
    selector: string,
  ): NodeListOf<Element> {
    return element.querySelectorAll(selector);
  }
}
