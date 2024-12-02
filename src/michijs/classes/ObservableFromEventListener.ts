import type {
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

interface ObjectWithAddEventListener<T> {
  addEventListener(key: string, callback: (e: T) => any): any;
}

export class ObservableFromEventListener<T = unknown> extends Observable<T> {
  constructor(obj: ObjectWithAddEventListener<T>, key: string) {
    super();
    obj.addEventListener(key, (e) => this.notify(e));
  }
}
