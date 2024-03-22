import type {
  CreateOptions,
  CreateFCCResult,
  ObservableOrConstWithChildren,
  AnyObject,
} from "../types";
import { createFunctionalComponent } from "./createFunctionalComponent";

export function createFunctionalComponentWithChildren<
  T extends AnyObject,
  S extends Element = Element,
  C = CreateOptions<S>,
>(
  callback: CreateFCCResult<T, S, C>,
): (props: ObservableOrConstWithChildren<T>) => JSX.Element {
  return createFunctionalComponent(callback);
}
