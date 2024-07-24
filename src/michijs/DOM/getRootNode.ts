import type { MichiCustomElement } from "../types";
import { getShadowRoot } from "../utils/getShadowRoot";

export function getRootNode(self: MichiCustomElement): Document | ShadowRoot {
  return getShadowRoot(self) ?? (self.getRootNode() as Document | ShadowRoot);
}
