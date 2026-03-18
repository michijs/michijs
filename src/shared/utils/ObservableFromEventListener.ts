import type { ObjectWithAddEventListener } from "@shared";
import { Observable } from "../../domain/entities/reactive/core/Observable";

export class ObservableFromEventListener<T = unknown> extends Observable<T> {
  constructor(obj: ObjectWithAddEventListener<T>, key: string) {
    super();
    obj.addEventListener(key, (e) => this.notify(e));
  }
}
