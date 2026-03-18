import type { TypedEvent } from "./TypedEvent";
/** PopStateEvent is an event handler for the popstate event on the window. */
export interface TypedPopStateEvent<T> extends TypedEvent<T> {
    /**
     * Returns a copy of the information that was provided to pushState() or replaceState().
     */
    readonly state: unknown;
}
