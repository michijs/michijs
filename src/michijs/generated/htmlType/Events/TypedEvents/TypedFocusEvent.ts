import { TypedUIEvent } from "./TypedUIEvent";
/** Focus-related events like focus, blur, focusin, or focusout. */
export interface TypedFocusEvent<T> extends TypedUIEvent<T> {
    readonly relatedTarget: EventTarget | null;
}
