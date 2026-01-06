import type { BrowserPort, LocationPort } from "../../ports/browser.port";

export class BrowserAPIAdapter implements BrowserPort {
  get location(): Location {
    return window.location;
  }

  get history(): History {
    return window.history;
  }

  get localStorage(): Storage {
    return window.localStorage;
  }

  get sessionStorage(): Storage {
    return window.sessionStorage;
  }

  get navigator(): Navigator {
    return window.navigator;
  }

  get document(): Document {
    return window.document;
  }

  get window(): Window & typeof globalThis {
    return window;
  }

  pushState(data: any, title: string, url?: string): void {
    this.history.pushState(data, title, url);
  }

  replaceState(data: any, title: string, url?: string): void {
    this.history.replaceState(data, title, url);
  }

  createURL(url: string, base?: string): URL {
    return new URL(url, base);
  }

  createURLSearchParams(params: Record<string, string>): URLSearchParams {
    return new URLSearchParams(params);
  }

  dispatchEvent(event: Event): boolean {
    return this.window.dispatchEvent(event);
  }

  addEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.window.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions,
  ): void {
    this.window.removeEventListener(type, listener, options);
  }
}

export class BrowserLocationAdapter implements LocationPort {
  get href(): string {
    return window.location.href;
  }

  set href(value: string) {
    window.location.href = value;
  }

  get origin(): string {
    return window.location.origin;
  }

  get pathname(): string {
    return window.location.pathname;
  }

  get search(): string {
    return window.location.search;
  }

  get hash(): string {
    return window.location.hash;
  }
}

export const browserAPIAdapter = new BrowserAPIAdapter();
export const locationAdapter = new BrowserLocationAdapter();
