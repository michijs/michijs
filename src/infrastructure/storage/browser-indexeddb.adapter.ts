import type { IndexedDBPort } from "../../ports/storage.port";

export class BrowserIndexedDBAdapter implements IndexedDBPort {
  async open(name: string, version = 1): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // Default upgrade logic - can be customized
      };
    });
  }

  async get<T>(store: string, key: any): Promise<T | undefined> {
    const db = await this.open(store);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([store], "readonly");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async put<T>(store: string, value: T, key?: any): Promise<any> {
    const db = await this.open(store);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([store], "readwrite");
      const objectStore = transaction.objectStore(store);
      const request = key
        ? objectStore.put(value, key)
        : objectStore.put(value);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(store: string, key: any): Promise<void> {
    const db = await this.open(store);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([store], "readwrite");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAll<T>(store: string): Promise<T[]> {
    const db = await this.open(store);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([store], "readonly");
      const objectStore = transaction.objectStore(store);
      const request = objectStore.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}

export const indexedDBAdapter = new BrowserIndexedDBAdapter();
