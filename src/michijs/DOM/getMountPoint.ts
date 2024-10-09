import type { MichiCustomElement } from "../types";
import { getShadowRoot } from "../utils/getShadowRoot";

export function getMountPoint(
  self: MichiCustomElement,
): ShadowRoot | MichiCustomElement {
  return getShadowRoot(self) ?? self;
}
