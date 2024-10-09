import type { MichiElementOptions, MichiElementSelf } from "../types";

export function createElementProperties<O extends MichiElementOptions>(
  elementOptions: O & ThisType<MichiElementSelf<O>>,
): O {
  return elementOptions;
}
