import { isObservable } from "../typewards/isObservable";
import type { ObservablePort } from "#ports";

export function getObservables<T>(obj: T): ObservablePort<T>[] {
  if (obj) {
    if (isObservable(obj)) return [obj as ObservablePort<T>];

    // It needs to include arrays also
    if (typeof obj === "object") {
      const observables: ObservablePort<any>[] = [];
      for (const x of Object.values(obj))
        observables.push(...getObservables(x));
      return observables;
    }
  }
  return [];
}
