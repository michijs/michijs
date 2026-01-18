import type { MichiCustomElement } from "../../michijs/types";
import { getShadowRoot } from "../../michijs/utils/getShadowRoot";

export function getMountPoint(
  self: MichiCustomElement,
): ShadowRoot | MichiCustomElement {
  return getShadowRoot(self) ?? self;
}
