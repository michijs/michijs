import { Observable } from "./Observable";

interface ObjectWithAddEventListener<T> {
  addEventListener(key: string, callback: (e: T) => any): any;
}

export class ObservableFromEventListener<T = unknown> extends Observable<T> {
  constructor(obj: ObjectWithAddEventListener<T>, key: string) {
    super();
    obj.addEventListener(key, (e) => this.notify(e));
  }
}
