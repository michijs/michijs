import type { TypedEvent } from "./TypedEvent";
export interface TypedPageTransitionEvent<T> extends TypedEvent<T> {
    /**
     * For the pageshow event, returns false if the page is newly being loaded (and the load event will fire). Otherwise, returns true.
     *
     * For the pagehide event, returns false if the page is going away for the last time. Otherwise, returns true, meaning that (if nothing conspires to make the page unsalvageable) the page might be reused if the user navigates back to this page.
     *
     * Things that can cause the page to be unsalvageable include:
     *
     * The user agent decided to not keep the Document alive in a session history entry after unload
     * Having iframes that are not salvageable
     * Active WebSocket objects
     * Aborting a Document
     */
    readonly persisted: boolean;
}
