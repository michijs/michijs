import { ObserverCallback } from "../types";
import { deepEqual } from "../utils";
import { ProxiedValue } from "./ProxiedValue";

export class ProxiedStoredValue<T> extends ProxiedValue<T> {
  constructor(private key: string, private defaultValue?: T, initialObservers?: Set<ObserverCallback<T>>, private storage: Storage = localStorage) {
    super(undefined, initialObservers)
    window.addEventListener("storage", (ev: StorageEvent) => {
      if (this.shouldCheckForChanges() && ev.key === key && storage === ev.storageArea) this.notify(this.$value);
    })
  }

  set $value(newValue: T) {
    if (this.shouldCheckForChanges()) {
      if (!deepEqual(newValue, this.$value)) {
        this.storage.setItem(this.key, JSON.stringify(newValue))
      }
    } else
      this.storage.setItem(this.key, JSON.stringify(newValue))
  }
  get $value() {
    const localStorageValue = this.storage.getItem(this.key);
    if (localStorageValue) {
      try {
        return JSON.parse(localStorageValue);
      } catch {
        return this.defaultValue!;
      }
    } else {
      return this.defaultValue!;
    }
  }
}
