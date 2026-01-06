import type { StoragePort } from "../../ports/storage.port";

export class BrowserStorageAdapter implements StoragePort {
  constructor(private storage: Storage) {}

  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage quota exceeded or other errors
    }
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export const localStorageAdapter = new BrowserStorageAdapter(localStorage);
export const sessionStorageAdapter = new BrowserStorageAdapter(sessionStorage);
