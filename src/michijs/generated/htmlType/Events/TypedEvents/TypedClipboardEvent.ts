import { TypedEvent } from "./TypedEvent";
/** Events providing information related to modification of the clipboard, that is cut, copy, and paste events. */
export interface TypedClipboardEvent<T> extends TypedEvent<T> {
    readonly clipboardData: DataTransfer | null;
}
