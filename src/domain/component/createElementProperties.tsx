import type { MichiElementOptions, MichiElementSelf } from "../shared/types/types";

export function createElementProperties<O extends MichiElementOptions>(
  elementOptions: O & ThisType<MichiElementSelf<O>>,
): O {
  return elementOptions;
}
