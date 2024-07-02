import { Observable } from ".";
import { ObservableFromEventListener } from "./ObservableFromEventListener";
import { formatToKebabCase } from "../utils";

/**
 * @typedef {object} CookieStorageConstructor
 * @property {string} [path]
 * @property {string} [domain]
 * @property {number} [maxAge]
 * @property {string} [expires]
 * @property {"lax" | "strict"} [sameSite]
 */

/**
 * @returns {{}}
 */
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

/**
 * @type {{}}
 */
let mainCookieStorage = getCookies();
/**
 * @type {string}
 */
let currentCookies = document.cookie;

const cookieStoreObservable = new Observable();
// @ts-ignore
if (window.cookieStore) {
  // @ts-ignore
  const cookieStoreChange = new ObservableFromEventListener(
    // @ts-ignore
    cookieStore,
    "change",
  );

  cookieStoreChange.subscribe((e) => {
    if (document.cookie !== currentCookies) {
      currentCookies = document.cookie;
      mainCookieStorage = getCookies();
      // @ts-ignore
      cookieStoreObservable.notify([
        // @ts-ignore
        ...e.changed.map((x) => x.name),
        // @ts-ignore
        ...e.deleted.map((x) => x.name),
      ]);
    }
  });
}

/**
 * @implements {Storage}
 */
export class CookieStorage {
  /**
   * @type {Observable<string[]>}
   */
  static cookieStoreObservable = cookieStoreObservable;
  /**
   * @type {string | undefined}
   */
  setOptions;
  get length() {
    return Object.keys(mainCookieStorage).length;
  }

  /**
   * @param {CookieStorageConstructor} [setOptions]
   */
  constructor(setOptions) {
    this.setOptions = Object.entries(setOptions ?? {}).reduce(
      (previousValue, [key, value]) => {
        if (value) previousValue += `;${formatToKebabCase(key)}=${value}`;
        return previousValue;
      },
      "",
    );
  }
  clear() {
    Object.keys(mainCookieStorage).forEach((x) => this.removeItem(x));
  }
  /**
   * @param {string} key
   */
  getItem(key) {
    return mainCookieStorage[key.trim()] ?? null;
  }
  /**
   * @param {number} index
   */
  key(index) {
    return Object.keys(mainCookieStorage)[index] ?? null;
  }
  /**
   * @param {string} key
   */
  removeItem(key) {
    const trimKey = key.trim();
    document.cookie = `${trimKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    currentCookies = document.cookie;
    delete mainCookieStorage[trimKey];
  }
  /**
   * @param {string} key
   * @param {string} value
   */
  setItem(key, value) {
    if (value?.length > 0) {
      const trimKey = key.trim();
      mainCookieStorage[trimKey] = value;
      document.cookie = `${trimKey}=${encodeURIComponent(value)}${this.setOptions}`;
      currentCookies = document.cookie;
    } else this.removeItem(key);
  }
}
