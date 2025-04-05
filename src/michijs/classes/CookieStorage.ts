import { Observable } from "./Observable";
import { ObservableFromEventListener } from "./ObservableFromEventListener";
import { formatToKebabCase } from "../utils/formatToKebabCase";

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
  const cookieStoreChange = new ObservableFromEventListener<{
    changed: { name: string }[];
    deleted: { name: string }[];
  }>(
    // @ts-ignore
    window.cookieStore,
    "change",
  );

  cookieStoreChange.subscribe((e) => {
    if (document.cookie !== currentCookies) {
      currentCookies = document.cookie;
      mainCookieStorage = getCookies();
      cookieStoreObservable.notify([
        ...e.changed.map((x) => x.name),
        ...e.deleted.map((x) => x.name),
      ]);
    }
  });
}

export class CookieStorage implements Storage {
  static cookieStoreObservable: Observable<string[]> = cookieStoreObservable;
  setOptions: string | undefined;
  [name: string]: any;
  get length(): number {
    return Object.keys(mainCookieStorage).length;
  }

  constructor(setOptions?: CookieStorageConstructor) {
    this.setOptions = Object.entries(setOptions ?? {}).reduce(
      (previousValue, [key, value]) => {
        if (value) previousValue += `;${formatToKebabCase(key)}=${value}`;
        return previousValue;
      },
      "",
    );
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
    if (value?.length > 0) {
      const trimKey = key.trim();
      mainCookieStorage[trimKey] = value;
      document.cookie = `${trimKey}=${encodeURIComponent(value)}${
        this.setOptions
      }`;
      currentCookies = document.cookie;
    } else this.removeItem(key);
  }
}
