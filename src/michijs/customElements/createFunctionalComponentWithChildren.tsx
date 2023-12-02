import { CreateOptions, FCC, ObservablePropsWithChildren, AnyObject } from "../types";
import { createFunctionalComponent } from "./createFunctionalComponent";

export function createFunctionalComponentWithChildren<T extends AnyObject, S extends Element = Element, C = CreateOptions<S>>(callback: FCC<T, S, C>): ((props: ObservablePropsWithChildren<T>) => JSX.Element) {
  return createFunctionalComponent(callback)
}