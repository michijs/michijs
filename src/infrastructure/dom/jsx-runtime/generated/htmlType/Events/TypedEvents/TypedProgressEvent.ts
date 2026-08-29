import type { TypedEvent } from "./TypedEvent";
/** Events measuring progress of an underlying process, like an HTTP request (for an XMLHttpRequest, or the loading of the underlying resource of an <img>, <audio>, <video>, <style> or <link>). */
export interface TypedProgressEvent<T> extends TypedEvent<T> {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
}
