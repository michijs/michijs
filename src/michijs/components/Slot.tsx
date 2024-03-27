import type { HTMLElements } from "../generated/htmlType";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import type { FC } from "../types";
import { getShadowRoot } from "../utils/getShadowRoot";

type SlotProps = HTMLElements["slot"];

/**Allows to set attributes and event listeners to the host element itself. */
export const Slot: FC<SlotProps> = (attrs, options) => {
  const self = options?.contextElement;
  if (self && isMichiCustomElement(self)) {
    if (getShadowRoot(self)) return <slot {...attrs} />;
    else {
      if (attrs.name) {
        // self.slot
      } else {
      }
    }
  }

  return null;
};
