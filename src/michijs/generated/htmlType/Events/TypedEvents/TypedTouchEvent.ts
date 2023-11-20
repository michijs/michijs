import { TypedUIEvent } from "./TypedUIEvent";
export interface TypedTouchEvent<T> extends TypedUIEvent<T> {
    readonly altKey: boolean;
    readonly changedTouches: TouchList;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
    readonly targetTouches: TouchList;
    readonly touches: TouchList;
}
