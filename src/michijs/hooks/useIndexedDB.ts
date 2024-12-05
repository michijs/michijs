import { Observable } from "../classes/Observable";
import type {
  AnyObject,
  IndexeddbObservableResult,
  InitDb,
  TypedIDBObjectStore,
  UseIndexedDB,
} from "../types";

const initDb: InitDb = (name, objectsStore, version = 1) => {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(name, version);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      for (const [key, options] of Object.entries(objectsStore))
        if (!db.objectStoreNames.contains(key))
          db.createObjectStore(key, options);
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
};

/**
 * It sets up event listeners for changes in the IndexedDB database. It returns a Proxy object that intercepts property accesses and performs corresponding IndexedDB operations. IndexedDB operations are performed asynchronously and return Promises.
 * @param name Specifies the name of the IndexedDB database to be used or created.
 * @param objectsStore Is a generic type that describes the structure of the object stores. It's defined as an object where each key represents the name of a property in the stored objects, and the value represents the configuration options for that property.
 * @param version specifies the version number of the IndexedDB database. If the database with the specified name already exists and its version is lower than the provided version, it will perform any necessary upgrades.
 * @returns A Proxy object that intercepts property accesses and performs corresponding IndexedDB operations.
 */
export const useIndexedDB: UseIndexedDB = (name, objectsStore, version = 1) => {
  const listenerEventName = `indexedDB-${name}-change`;
  const bc = new BroadcastChannel(listenerEventName);
  const observable = new Observable<string>();

  bc.onmessage = (ev: MessageEvent<string>) => {
    observable.notify(ev.data);
  };

  const dbPromise = initDb(name, objectsStore, version);

  return new Proxy(
    observable as unknown as IndexeddbObservableResult<AnyObject>,
    {
      get(target, p: string, receiver) {
        if (p in target) return Reflect.get(target, p, receiver);

        return new Proxy(
          {},
          {
            get(_, method: keyof TypedIDBObjectStore<AnyObject>) {
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
    },
  ) as any;
};
