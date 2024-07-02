import type { GlobalEvents } from ".";
import type { TypedDocumentAndElementEventHandlers } from "./TypedDocumentAndElementEventHandlers";
import type { TypedElementEvent } from "./TypedElementEvent";
export interface MathMLEvents<T extends EventTarget = MathMLElement>
  extends GlobalEvents<T>,
    TypedElementEvent<T>,
    TypedDocumentAndElementEventHandlers<T> {}
