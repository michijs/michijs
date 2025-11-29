import { isObservable } from "../typeWards/isObservable";
import type { ObservableType } from "../types";

export function getObservables<T>(obj: T): ObservableType<T>[] {
  if (obj) {
    if (isObservable(obj)) return [obj as ObservableType<T>];

    // It needs to include arrays also
    if (typeof obj === "object") {
      const observables: ObservableType<any>[] = [];
      for (const x of Object.values(obj))
        observables.push(...getObservables(x));
      return observables;
    }
  }
  return [];
}
