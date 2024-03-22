import type { HTMLElements } from "../generated/htmlType";
import { isMichiCustomElement } from "../typeWards/isMichiCustomElement";
import { FC } from "../types";

type SlotProps = HTMLElements["slot"];

/**Allows to set attributes and event listeners to the host element itself. */
export const Slot: FC<SlotProps> = ({ children, ...attrs }, options) => {
  const self = options?.contextElement;
  if (self && isMichiCustomElement(self))
    if (attrs.name) {
      // self.slot
    } else {
    }

  return null;
};
