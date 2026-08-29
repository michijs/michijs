import type { AllEvents } from "./AllEvents";
export interface TypedElementEvent<T extends EventTarget> extends Pick<AllEvents<T>, "onfullscreenchange" | "onfullscreenerror"> {
}
