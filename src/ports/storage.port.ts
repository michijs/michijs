export interface StoragePort {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

export interface IndexedDBPort {
  open(name: string, version?: number): Promise<IDBDatabase>;
  get<T>(store: string, key: any): Promise<T | undefined>;
  put<T>(store: string, value: T, key?: any): Promise<any>;
  delete(store: string, key: any): Promise<void>;
  getAll<T>(store: string): Promise<T[]>;
}
