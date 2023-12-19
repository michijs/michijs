import {
  CreateOptions,
  FCC,
  ObservableOrConstWithChildren,
  AnyObject,
} from "../types";
import { createFunctionalComponent } from "./createFunctionalComponent";

export function createFunctionalComponentWithChildren<
  T extends AnyObject,
  S extends Element = Element,
  C = CreateOptions<S>,
>(
  callback: FCC<T, S, C>,
): (props: ObservableOrConstWithChildren<T>) => JSX.Element {
  return createFunctionalComponent(callback);
}
