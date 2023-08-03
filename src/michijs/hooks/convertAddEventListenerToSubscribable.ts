import { GlobalEvents, SVGEvents, MathMLEvents, WindowEvents } from "@michijs/htmltype";
import { ObservableLike } from "../types";

type AllEvents<T extends EventTarget> = GlobalEvents<T> & MathMLEvents<T> & SVGEvents<T> & WindowEvents<T>;
type AllEventsNotUndefined<T extends EventTarget> = Required<AllEvents<T>>;

type EventsMap<T extends EventTarget> = { [k in keyof AllEventsNotUndefined<T> as k extends `on${infer S}` ? S: k]: AllEventsNotUndefined<T>[k] extends ((e: any) => any) | undefined ? Parameters<AllEventsNotUndefined<T>[k]>[0] : unknown }

export const convertAddEventListenerToSubscribable = <const T extends EventTarget, K extends keyof EventsMap<T>>(obj: T, key: K): ObservableLike<EventsMap<T>[K]> => {
  

  obj.addEventListener(key,)


}