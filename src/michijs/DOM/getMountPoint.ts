import type { MichiCustomElement } from "../types";
import { getShadowRoot } from "../utils/getShadowRoot";

export function getMountPoint(self: MichiCustomElement) {
  return getShadowRoot(self) ?? self;
}
