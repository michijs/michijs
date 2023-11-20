import { GlobalEvents } from ".";
import { TypedDocumentAndElementEventHandlers } from "./TypedDocumentAndElementEventHandlers";
import { TypedElementEvent } from "./TypedElementEvent";
export interface MathMLEvents<T extends EventTarget = MathMLElement> extends GlobalEvents<T>, TypedElementEvent<T>, TypedDocumentAndElementEventHandlers<T> {
}
