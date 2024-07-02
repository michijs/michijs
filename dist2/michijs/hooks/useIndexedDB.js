import { Observable } from "../classes";

/**
 * @typedef {import('../types').AnyObject} AnyObject
 * @typedef {import('../types').ObservableLike} ObservableLike
 */

/**
 * @template {AnyObject} T
 * @typedef {object} TypedIDBObjectStoreParameters
 * @property {keyof T | (keyof T)[] | null} [keyPath]
 */

/**
 * This example shows a variety of different uses of object stores, from updating the data structure with IDBObjectStore.createIndex inside an onupgradeneeded function, to adding a new item to our object store with IDBObjectStore.add. For a full working example, see our To-do Notifications app (view example live.)
 * @template {AnyObject} T
 * @typedef {object} TypedIDBObjectStore
 * @property {(value: T, key?: IDBValidKey) => IDBRequest<IDBValidKey>} add Adds or updates a record in store with the given value and key.
 *
 * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
 *
 * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
 *
 * If successful, request's result will be the record's key.
 * @property {(query: IDBValidKey | IDBKeyRange) => IDBRequest<T>} get Retrieves the value of the first record matching the given key or key range in query.
 *
 * If successful, request's result will be the value, or undefined if there was no matching record.
 * @property {(query?: IDBValidKey | IDBKeyRange | null, count?: number) => IDBRequest<T[]>} getAll Retrieves the values of the records matching the given key or key range in query (up to count if given).
 *
 * If successful, request's result will be an Array of the values.
 * @property {(value: T, key?: IDBValidKey) => IDBRequest<IDBValidKey>} put Adds or updates a record in store with the given value and key.
 *
 * If the store uses in-line keys and key is specified a "DataError" DOMException will be thrown.
 *
 * If put() is used, any existing record with the key will be replaced. If add() is used, and if a record with the key already exists the request will fail, with request's error set to a "ConstraintError" DOMException.
 *
 * If successful, request's result will be the record's key.
 */

/**
 * @template {AnyObject} T
 * @typedef {{ [k in keyof T]?: TypedIDBObjectStoreParameters<T[k]>; }} ObjectStore
 */

/**
 * @template {AnyObject} T
 * @typedef {{ [k in keyof TypedIDBObjectStore<T>]: TypedIDBObjectStore<T>[k] extends (...args: any ) => any ? (...args: Parameters<TypedIDBObjectStore<T>[k]> ) => Promise< | (ReturnType<TypedIDBObjectStore<T>[k]> extends IDBRequest<infer R> ? R : ReturnType<TypedIDBObjectStore<T>[k]>) | null > : Promise<TypedIDBObjectStore<T>[k]>; }} PromisableTypedIDBObjectStore
 */

/**
 * @template {AnyObject} T
 * @typedef {{ [k in keyof T]?: PromisableTypedIDBObjectStore<T[k]>; } & ObservableLike<keyof T>} IndexeddbObservableResult
 */

/**
 * @template {AnyObject} T
 * @param {string} name
 * @param {ObjectStore<T>} objectsStore
 * @returns {Promise<IDBDatabase>}
 */
function initDb(name, objectsStore, version = 1) {
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
 * @template {AnyObject} T
 * @param {string} name Specifies the name of the IndexedDB database to be used or created.
 * @param {ObjectStore<T>} objectsStore Is a generic type that describes the structure of the object stores. It's defined as an object where each key represents the name of a property in the stored objects, and the value represents the configuration options for that property.
 * @returns {IndexeddbObservableResult<T>} A Proxy object that intercepts property accesses and performs corresponding IndexedDB operations.
 */
export function useIndexedDB(name, objectsStore, version = 1) {
    const listenerEventName = `indexedDB-${name}-change`;
    const bc = new BroadcastChannel(listenerEventName);
    const observable = new Observable();

    bc.onmessage = (ev) => {
        observable.notify(ev.data);
    };

    const dbPromise = initDb(name, objectsStore, version);

    return new Proxy(observable, {
        get(target, p, receiver) {
            if (p in target)
                return Reflect.get(target, p, receiver);

            return new Proxy({}, {
                get(_, method) {
                    let transactionMode = "readonly";
                    switch (method) {
                        case "add":
                        case "clear":
                        case "delete":
                        case "deleteIndex":
                        case "put": {
                            transactionMode = "readwrite";
                        }
                    }
                    if ([
                        "autoIncrement",
                        "indexNames",
                        "keyPath",
                        "name",
                        "transaction",
                    ].includes(method)) {
                        return new Promise(async (resolve) => {
                            const db = await dbPromise;
                            const transaction = db.transaction(p, transactionMode);
                            resolve(transaction.objectStore(p)[method]);
                        });
                    }
                    return (...args) => new Promise(async (resolve, reject) => {
                        const db = await dbPromise;
                        const transaction = db.transaction(p, transactionMode);
                        const result = transaction.objectStore(p)[method].call(transaction.objectStore(p), ...args);
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
                        }
                        else {
                            resolve(result);
                        }
                    });
                },
            });
        },
    });
}
