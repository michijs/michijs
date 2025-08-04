import type { CookieStorageConstructor } from "../types";
import { Observable } from "./Observable";
import { ObservableFromEventListener } from "./ObservableFromEventListener";

const mainCookieStorage = new Map<string, string | null>();

const getCookieValue = (value: string | null | undefined): string | null => {
  try {
    return value ? decodeURIComponent(value) : null;
  } catch {
    return value ?? null;
  }
};

removeTopLevelAwaits: {
  (await cookieStore.getAll()).forEach((x) => {
    if (x.name)
      mainCookieStorage.set(x.name, getCookieValue(x.value))
  });
}

const cookieStoreChange = new ObservableFromEventListener<{
  changed: CookieListItem[];
  deleted: CookieListItem[];
}>(cookieStore, "change");

const observable = new Observable<string[]>();

cookieStoreChange.subscribe(async (e) => {
  for (const { name } of e.changed)
    if (name)
      mainCookieStorage.set(
        name,
        getCookieValue((await cookieStore.get(name))?.value),
      );
  for (const { name } of e.deleted) {
    if (name)
      mainCookieStorage.delete(name)
  };
  observable.notify(e.changed.concat(e.deleted).filter(x => x.name).map((x) => (x as { name: string }).name));
});

export class CookieStorage implements Storage {
  observable = observable;
  private setOptions: CookieStorageConstructor | undefined;
  [name: string]: any;
  get length(): number {
    return mainCookieStorage.size;
  }

  constructor(setOptions?: CookieStorageConstructor) {
    this.setOptions = setOptions;
  }
  clear(): void {
    mainCookieStorage.clear();
    mainCookieStorage.forEach((_, key) => cookieStore.delete(key));
  }
  getItem(key: string): string | null {
    return mainCookieStorage.get(key) ?? null;
  }
  key(index: number): string | null {
    return mainCookieStorage.get(mainCookieStorage.keys()[index]) ?? null;
  }
  removeItem(key: string): void {
    mainCookieStorage.delete(key);
    cookieStore.delete(key);
  }
  setItem(key: string, value: string): void {
    const encodedValue = encodeURIComponent(value);
    mainCookieStorage.set(key, encodedValue);
    cookieStore.set({
      name: key,
      value: encodedValue,
      ...(this.setOptions ?? {}),
    });
  }
}