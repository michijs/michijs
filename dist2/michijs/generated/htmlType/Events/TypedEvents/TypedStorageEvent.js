/**
 * @typedef {import('./TypedEvent').TypedEvent} TypedEvent
 */

/**
 * A StorageEvent is sent to a window when a storage area it has access to is changed within the context of another document.
 * @template T
 * @typedef {object} TypedStorageEvent
 * @property {string | null} key Returns the key of the storage item being changed.
 * @property {string | null} newValue Returns the new value of the key of the storage item whose value is being changed.
 * @property {string | null} oldValue Returns the old value of the key of the storage item whose value is being changed.
 * @property {Storage | null} storageArea Returns the Storage object that was affected.
 * @property {string} url Returns the URL of the document whose storage item changed.
 * @property {(type: string, bubbles?: boolean, cancelable?: boolean, key?: string | null, oldValue?: string | null, newValue?: string | null, url?: string | URL, storageArea?: Storage | null) => void} initStorageEvent
 */
