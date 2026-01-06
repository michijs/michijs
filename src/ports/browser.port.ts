export interface BrowserPort {
  get location(): Location;
  get history(): History;
  get localStorage(): Storage;
  get sessionStorage(): Storage;
  get navigator(): Navigator;
  get document(): Document;
  get window(): Window & typeof globalThis;

  // History API
  pushState(data: any, title: string, url?: string): void;
  replaceState(data: any, title: string, url?: string): void;

  // URL API
  createURL(url: string, base?: string): URL;
  createURLSearchParams(params: Record<string, string>): URLSearchParams;

  // Event API
  dispatchEvent(event: Event): boolean;
  addEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListener,
    options?: boolean | EventListenerOptions,
  ): void;
}

export interface LocationPort {
  get href(): string;
  set href(value: string);
  get origin(): string;
  get pathname(): string;
  get search(): string;
  get hash(): string;
}
