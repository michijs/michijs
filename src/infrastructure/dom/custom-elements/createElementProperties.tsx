import type { MichiElementOptions, MichiElementSelf } from "../../../michijs/types";

export function createElementProperties<O extends MichiElementOptions>(
  elementOptions: O & ThisType<MichiElementSelf<O>>,
): O {
  return elementOptions;
}
