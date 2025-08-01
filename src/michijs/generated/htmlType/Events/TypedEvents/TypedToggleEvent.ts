import type { TypedEvent } from "./TypedEvent";
export interface TypedToggleEvent<T> extends TypedEvent<T>, Pick<ToggleEvent, "newState" | "oldState"> {
}
