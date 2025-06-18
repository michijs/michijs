import type { CookieStorageConstructor } from "../../types";
import { Observable } from "../Observable";
import { ObservableFromEventListener } from "../ObservableFromEventListener";

const mainCookieStorage = (await cookieStore.getAll()).reduce((previousValue, currentValue) => {
  previousValue[currentValue.name] = currentValue.value;
  return previousValue;
}, {});

const cookieStoreChange = new ObservableFromEventListener<{
  changed: CookieListItem[];
  deleted: CookieListItem[];
}>(
  window.cookieStore,
  "change",
);

const observable = new Observable<string[]>();

cookieStoreChange.subscribe(async (e) => {
  for(const {name} of e.changed){
    mainCookieStorage[name] = (await cookieStore.get(name))?.value;
  }
  for(const {name} of e.deleted){
    delete mainCookieStorage[name]
  }
  observable.notify(e.changed.concat(e.deleted).map(x => x.name))
});

export class ModernCookieStorage implements Storage {
  observable = observable;
  private setOptions: CookieStorageConstructor | undefined;
  [name: string]: any;
  get length(): number {
    return Object.keys(mainCookieStorage).length;
  }

  constructor(setOptions?: CookieStorageConstructor) {
    this.setOptions = setOptions;
  }
  clear(): void {
    Object.keys(mainCookieStorage).forEach((x) => this.removeItem(x));
  }
  getItem(key: string): string | null {
    return mainCookieStorage[key] ?? null;
  }
  key(index: number): string | null {
    return Object.keys(mainCookieStorage)[index] ?? null;
  }
  removeItem(key: string): void {
    delete mainCookieStorage[key];
    cookieStore.delete(key);
  }
  setItem(key: string, value: string): void {
    mainCookieStorage[key] = value;
    cookieStore.set({ name: key, value, ...(this.setOptions ?? {}) });
  }
}
