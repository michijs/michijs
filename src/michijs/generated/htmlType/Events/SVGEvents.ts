import type { GlobalEvents } from ".";
import type { TypedDocumentAndElementEventHandlers } from "./TypedDocumentAndElementEventHandlers";
import type { TypedElementEvent } from "./TypedElementEvent";
export interface SVGEvents<T extends EventTarget>
  extends GlobalEvents<T>,
    TypedElementEvent<T>,
    TypedDocumentAndElementEventHandlers<T> {}
