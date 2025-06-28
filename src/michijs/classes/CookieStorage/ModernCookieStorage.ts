import type { CookieStorageConstructor } from "../../types";
import { Observable } from "../Observable";
import { ObservableFromEventListener } from "../ObservableFromEventListener";

const mainCookieStorage = new Map<string, string | undefined>();

removeTopLevelAwaits: {
  (await cookieStore.getAll()).forEach((x) =>
    mainCookieStorage.set(x.name, x.value),
  );
}

const cookieStoreChange = new ObservableFromEventListener<{
  changed: CookieListItem[];
  deleted: CookieListItem[];
}>(cookieStore, "change");

const observable = new Observable<string[]>();

cookieStoreChange.subscribe(async (e) => {
  for (const { name } of e.changed)
    mainCookieStorage.set(name, (await cookieStore.get(name))?.value);
  for (const { name } of e.deleted) mainCookieStorage.delete(name);
  observable.notify(e.changed.concat(e.deleted).map((x) => x.name));
});

export class ModernCookieStorage implements Storage {
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
    const value = mainCookieStorage.get(key);
    try {
      return value ? decodeURIComponent(value) : null;
    } catch {
      return value ?? null;
    }
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
