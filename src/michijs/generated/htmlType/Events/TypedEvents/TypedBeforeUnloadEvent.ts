import { TypedEvent } from "./TypedEvent";
/** The beforeunload event is fired when the window, the document and its resources are about to be unloaded. */
export interface TypedBeforeUnloadEvent<T> extends TypedEvent<T> {
  returnValue: unknown;
}
