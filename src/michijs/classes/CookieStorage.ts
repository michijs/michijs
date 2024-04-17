import { Observable } from ".";
import { ObservableFromEventListener } from "./ObservableFromEventListener";
import { formatToKebabCase } from "../utils";

export interface CookieStorageConstructor {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: string;
  sameSite?: "lax" | "strict";
}

const getCookies = () =>
  document.cookie.split(";").reduce((previousValue, x) => {
    const [key, cookie] = x.split("=", 2);
    if (cookie) {
      const [value] = cookie?.split(";", 1);
      const trimKey = key.trim();

      previousValue[trimKey] = decodeURIComponent(value);
    }
    return previousValue;
  }, {});

let mainCookieStorage = getCookies();
let currentCookies = document.cookie;

const cookieStoreObservable = new Observable<string[]>();
// @ts-ignore
if (window.cookieStore) {
  // @ts-ignore
  const cookieStoreChange = new ObservableFromEventListener(
    cookieStore,
    "change",
  );

  cookieStoreChange.subscribe((e) => {
    if (document.cookie !== currentCookies) {
      currentCookies = document.cookie;
      mainCookieStorage = getCookies();
      // @ts-ignore
      cookieStoreObservable.notify([
        ...e.changed.map((x) => x.name),
        ...e.deleted.map((x) => x.name),
      ]);
    }
  });
}
// const dispatchStorageEvent =

export class CookieStorage implements Storage {
  static cookieStoreObservable = cookieStoreObservable;
  setOptions: string | undefined;
  [name: string]: any;
  get length(): number {
    return Object.keys(mainCookieStorage).length;
  }

  constructor(setOptions?: CookieStorageConstructor) {
    this.setOptions = Object.entries(setOptions ?? {})
      .map(([key, value]) => `;${formatToKebabCase(key)}=${value}`)
      .join("");
  }
  clear(): void {
    Object.keys(mainCookieStorage).forEach((x) => this.removeItem(x));
  }
  getItem(key: string): string | null {
    return mainCookieStorage[key.trim()] ?? null;
  }
  key(index: number): string | null {
    return Object.keys(mainCookieStorage)[index] ?? null;
  }
  removeItem(key: string): void {
    const trimKey = key.trim();
    document.cookie = `${trimKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    currentCookies = document.cookie;
    delete mainCookieStorage[trimKey];
  }
  setItem(key: string, value: string): void {
    if (value.length > 0) {
      const trimKey = key.trim();
      mainCookieStorage[trimKey] = value;
      document.cookie = `${trimKey}=${encodeURIComponent(value)}${
        this.setOptions
      }`;
      currentCookies = document.cookie;
    }
  }
}
