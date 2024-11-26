import { isObservableType } from "../typeWards/isObservableType";
import type { ObservableType } from "../types";

export function getObservables<T>(obj: T): ObservableType<T>[] {
  if (obj) {
    if (isObservableType<T>(obj)) return [obj as ObservableType<T>];

    // It needs to include arrays also
    if (typeof obj === "object") {
      const observables = new Array<ObservableType<any>>();
      for(const x of Object.values(obj))
        observables.push(...getObservables(x));
      return observables;
    }
  }
  return [];
}
