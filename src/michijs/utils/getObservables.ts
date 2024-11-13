import { isObservableType } from "../typeWards/isObservableType";
import type { ObservableType } from "../types";
import { extendsObject } from "./extendsObject";

export function getObservables<T>(obj: T): ObservableType<T>[] {
  if (obj)
    if (isObservableType<T>(obj)) {
      return [obj as ObservableType<T>];
    } else if (extendsObject(obj)) {
      const observables = new Array<ObservableType<any>>();
      Object.values(obj).forEach((x) => {
        observables.push(...getObservables(x));
      });
      return observables;
    }
  return [];
}
