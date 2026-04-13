import type { ObservableProxyPort, ObservablePort } from "@domain";
import type { AnyObject } from "@shared";

export interface UseStorage {
  <T extends object>(item: T, storage?: Storage): ObservableProxyPort<T>;
}

export interface TypedIDBObjectStoreParameters<T extends AnyObject>
  extends Omit<IDBObjectStoreParameters, "keyPath"> {
  keyPath?: keyof T | (keyof T)[] | null;
}

export type ObjectStore<T extends AnyObject> = {
  [k in keyof T]?: TypedIDBObjectStoreParameters<T[k]>;
};

export interface UseIndexedDB {
  <T extends AnyObject>(
    name: string,
    objectsStore: ObjectStore<T>,
    version?: number,
  ): IndexeddbObservableResult<T>;
}

export interface InitDb {
  <T extends AnyObject>(
    name: string,
    objectsStore: ObjectStore<T>,
    version?: number,
  ): Promise<IDBDatabase>;
}

/** This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.) */
export interface TypedIDBObjectStore<T extends AnyObject>
  extends Omit<IDBObjectStore, "add" | "get" | "getAll" | "put"> {
  /**
   * Adds or updates a record in store with the given value and key.
   *
   * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
   *
   * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
   *
   * If successful, request's result will be the record's key.
   */
  add(value: T, key?: IDBValidKey): IDBRequest<IDBValidKey>;
  /**
   * Retrieves the value of the first record matching the given key or key range in query.
   *
   * If successful, request's result will be the value, or undefined if there was no matching record.
   */
  get(query: IDBValidKey | IDBKeyRange): IDBRequest<T>;
  /**
   * Retrieves the values of the records matching the given key or key range in query (up to count if given).
   *
   * If successful, request's result will be an Array of the values.
   */
  getAll(
    query?: IDBValidKey | IDBKeyRange | null,
    count?: number,
  ): IDBRequest<T[]>;
  /**
   * Adds or updates a record in store with the given value and key.
   *
   * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
   *
   * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
   *
   * If successful, request's result will be the record's key.
   */
  put(value: T, key?: IDBValidKey): IDBRequest<IDBValidKey>;
}

export type PromisableTypedIDBObjectStore<T extends AnyObject> = {
  [k in keyof TypedIDBObjectStore<T>]: TypedIDBObjectStore<T>[k] extends (
    ...args: any
  ) => any
    ? (
        ...args: Parameters<TypedIDBObjectStore<T>[k]>
      ) => Promise<
        | (ReturnType<TypedIDBObjectStore<T>[k]> extends IDBRequest<infer R>
            ? R
            : ReturnType<TypedIDBObjectStore<T>[k]>)
        | undefined
      >
    : Promise<TypedIDBObjectStore<T>[k]>;
};

export type IndexeddbObservableResult<T extends AnyObject> = {
  [k in keyof T]: PromisableTypedIDBObjectStore<T[k]>;
} & ObservablePort<keyof T>;

export interface CookieStorageConstructor
  extends Omit<CookieInit, "name" | "value"> {}
