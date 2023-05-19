import { MichiElementOptions, MichiElementSelf } from "../types";

export function createElementProperties<
  O extends MichiElementOptions,
  S extends HTMLElement = MichiElementSelf<O>,
>(elementOptions: O & ThisType<S>) {
  return elementOptions;
}
