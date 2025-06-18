import { formatToKebabCase } from "../../utils/formatToKebabCase";
import type { CookieStorageConstructor } from "../../types";

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

const mainCookieStorage = getCookies();

export class LegacyCookieStorage implements Storage {
  private setOptions: string | undefined;
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
    delete mainCookieStorage[trimKey];
  }
  setItem(key: string, value: string): void {
    if (value?.length > 0) {
      const trimKey = key.trim();
      mainCookieStorage[trimKey] = value;
      document.cookie = `${trimKey}=${encodeURIComponent(value)}${
        this.setOptions
      }`;
    } else this.removeItem(key);
  }
}
