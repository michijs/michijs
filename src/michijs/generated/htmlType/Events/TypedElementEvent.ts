import { TypedEvent } from "./TypedEvents/TypedEvent";
export interface TypedElementEvent<T> {
    onfullscreenchange?(ev: TypedEvent<T>): unknown;
    onfullscreenerror?(ev: TypedEvent<T>): unknown;
}
