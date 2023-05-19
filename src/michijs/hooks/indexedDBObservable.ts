import { AnyObject, ObservableLike } from "../types";
import { observable } from "./observable";

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
        | null
      >
    : Promise<TypedIDBObjectStore<T>[k]>;
};

type IndexeddbObservableResult<T extends AnyObject> = {
  [k in keyof T]?: PromisableTypedIDBObjectStore<T[k]>;
} & ObservableLike<keyof T>;

function initDb<T extends AnyObject>(
  name: string,
  objectsStore: ObjectStore<T>,
  version: number = 1,
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

export function indexedDBObservable<T extends AnyObject>(
  name: string,
  objectsStore: ObjectStore<T>,
  version: number = 1,
): IndexeddbObservableResult<T> {
  const listenerEventName = `indexedDB-${name}-change`;
  const bc = new BroadcastChannel(listenerEventName);
  const { notify, ...observableProps } = observable<keyof T>();

  bc.onmessage = (ev: MessageEvent<string>) => {
    notify(ev.data);
  };

  const dbPromise = initDb(name, objectsStore, version);

  return new Proxy({} as unknown as IndexeddbObservableResult<T>, {
    get(_, p: string) {
      if (Object.keys(observableProps).includes(p)) {
        return observableProps[p];
      }
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
            } else {
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
                        notify(p);
                        bc.postMessage(p);
                      }
                      resolve(result.result);
                    };
                    result.onerror = reject;
                  } else {
                    resolve(result);
                  }
                });
            }
          },
        },
      );
    },
  });
}
