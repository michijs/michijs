import {
  GlobalEvents,
  SVGEvents,
  MathMLEvents,
  WindowEvents,
} from "../generated/htmlType";
import { Observable } from "./Observable";

type AllEvents<T extends EventTarget> = GlobalEvents<T> &
  MathMLEvents<T> &
  SVGEvents<T> &
  WindowEvents<T>;
type AllEventsNotUndefined<T extends EventTarget> = Required<AllEvents<T>>;

type EventsMap<T extends EventTarget> = {
  [k in keyof AllEventsNotUndefined<T> as k extends `on${infer S}`
    ? S
    : k]: AllEventsNotUndefined<T>[k] extends ((e: any) => any) | undefined
    ? Parameters<AllEventsNotUndefined<T>[k]>[0]
    : unknown;
};

export class ObservableFromEventListener<
  const T extends EventTarget,
  K extends keyof EventsMap<T>,
> extends Observable<EventsMap<T>[K]> {
  constructor(obj: T, key: K) {
    super();
    obj.addEventListener(key, (e) => this.notify(e));
  }
}
