import { TypedMouseEvent } from "./TypedMouseEvent";
export interface TypedDragEvent<T> extends TypedMouseEvent<T> {
    /**
     * Returns the DataTransfer object for the event.
     */
    readonly dataTransfer: DataTransfer | null;
}
