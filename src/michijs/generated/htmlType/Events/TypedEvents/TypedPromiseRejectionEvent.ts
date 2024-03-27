import type { TypedEvent } from "./TypedEvent";
export interface TypedPromiseRejectionEvent<T> extends TypedEvent<T> {
    readonly promise: Promise<unknown>;
    readonly reason: unknown;
}
