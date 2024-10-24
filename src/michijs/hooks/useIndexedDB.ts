import { Observable } from "../classes/Observable";
import type { AnyObject, ObservableLike } from "../types";

interface TypedIDBObjectStoreParameters<T extends AnyObject>
  extends Omit<IDBObjectStoreParameters, "keyPath"> {
  keyPath?: keyof T | (keyof T)[] | null;
}

type ObjectStore<T extends AnyObject> = {
  [k in keyof T]?: TypedIDBObjectStoreParameters<T[k]>;
};

/** This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.) */
interface TypedIDBObjectStore<T extends AnyObject>
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

type PromisableTypedIDBObjectStore<T extends AnyObject> = {
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

type IndexeddbObservableResult<T extends AnyObject> = {
  [k in keyof T]: PromisableTypedIDBObjectStore<T[k]>;
} & ObservableLike<keyof T>;

function initDb<T extends AnyObject>(
  name: string,
  objectsStore: ObjectStore<T>,
  version = 1,
): Promise<IDBDatabase> {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(name, version);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      Object.entries(objectsStore).forEach(([key, options]) => {
        if (!db.objectStoreNames.contains(key)) {
          db.createObjectStore(key, options);
        }
      });
    };
    openRequest.onerror = () => {
      console.error("Error", openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      resolve(db);
      db.onversionchange = () => {
        db.close();
        location.reload();
      };
    };
  });
}

/**
 * It sets up event listeners for changes in the IndexedDB database. It returns a Proxy object that intercepts property accesses and performs corresponding IndexedDB operations. IndexedDB operations are performed asynchronously and return Promises.
 * @param name Specifies the name of the IndexedDB database to be used or created.
 * @param objectsStore Is a generic type that describes the structure of the object stores. It's defined as an object where each key represents the name of a property in the stored objects, and the value represents the configuration options for that property.
 * @param version specifies the version number of the IndexedDB database. If the database with the specified name already exists and its version is lower than the provided version, it will perform any necessary upgrades.
 * @returns A Proxy object that intercepts property accesses and performs corresponding IndexedDB operations.
 */
export function useIndexedDB<T extends AnyObject>(
  name: string,
  objectsStore: ObjectStore<T>,
  version = 1,
): IndexeddbObservableResult<T> {
  const listenerEventName = `indexedDB-${name}-change`;
  const bc = new BroadcastChannel(listenerEventName);
  const observable = new Observable<keyof T>();

  bc.onmessage = (ev: MessageEvent<string>) => {
    observable.notify(ev.data);
  };

  const dbPromise = initDb(name, objectsStore, version);

  return new Proxy(observable as unknown as IndexeddbObservableResult<T>, {
    get(target, p: string, receiver) {
      if (p in target) return Reflect.get(target, p, receiver);

      return new Proxy(
        {},
        {
          get(_, method: keyof TypedIDBObjectStore<T>) {
            let transactionMode: IDBTransactionMode = "readonly";
            switch (method) {
              case "add":
              case "clear":
              case "delete":
              case "deleteIndex":
              case "put": {
                transactionMode = "readwrite";
              }
            }
            if (
              [
                "autoIncrement",
                "indexNames",
                "keyPath",
                "name",
                "transaction",
              ].includes(method)
            ) {
              return new Promise(async (resolve) => {
                const db = await dbPromise;
                const transaction = db.transaction(p, transactionMode);
                resolve(transaction.objectStore(p)[method]);
              });
            }
            return (...args) =>
              new Promise(async (resolve, reject) => {
                const db = await dbPromise;
                const transaction = db.transaction(p, transactionMode);
                const result = (
                  transaction.objectStore(p)[method] as Function
                ).call(transaction.objectStore(p), ...args);
                transaction.onabort = reject;
                transaction.onerror = reject;
                if (result instanceof IDBRequest) {
                  result.onsuccess = () => {
                    if (transactionMode === "readwrite") {
                      observable.notify(p);
                      bc.postMessage(p);
                    }
                    resolve(result.result);
                  };
                  result.onerror = reject;
                } else {
                  resolve(result);
                }
              });
          },
        },
      );
    },
  });
}
