import type { TypedEvent } from "./TypedEvent";
/** A StorageEvent is sent to a window when a storage area it has access to is changed within the context of another document. */
export interface TypedStorageEvent<T> extends TypedEvent<T> {
  /**
   * Returns the key of the storage item being changed.
   */
  readonly key: string | null;
  /**
   * Returns the new value of the key of the storage item whose value is being changed.
   */
  readonly newValue: string | null;
  /**
   * Returns the old value of the key of the storage item whose value is being changed.
   */
  readonly oldValue: string | null;
  /**
   * Returns the Storage object that was affected.
   */
  readonly storageArea: Storage | null;
  /**
   * Returns the URL of the document whose storage item changed.
   */
  readonly url: string;
  initStorageEvent(
    type: string,
    bubbles?: boolean,
    cancelable?: boolean,
    key?: string | null,
    oldValue?: string | null,
    newValue?: string | null,
    url?: string | URL,
    storageArea?: Storage | null,
  ): void;
}
