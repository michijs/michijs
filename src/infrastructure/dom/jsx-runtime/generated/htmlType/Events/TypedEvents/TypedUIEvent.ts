import type { TypedEvent } from "./TypedEvent";
/** Simple user interface events. */
export interface TypedUIEvent<T> extends TypedEvent<T> {
    readonly detail: number;
    readonly view: Window | null;
    /** @deprecated */
    readonly which: number;
    /** @deprecated */
    initUIEvent(typeArg: string, bubblesArg?: boolean, cancelableArg?: boolean, viewArg?: Window | null, detailArg?: number): void;
}
