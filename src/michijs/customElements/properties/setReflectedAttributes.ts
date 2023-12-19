import { MichiCustomElement } from "../../types";
import { setAttribute } from "../../DOM/attributes/setAttribute";

export function setReflectedAttributes(
  self: MichiCustomElement,
  observedAttributes: string[],
) {
  observedAttributes.forEach((formattedPropertyKey) => {
    if (!self.hasAttribute(formattedPropertyKey))
      setAttribute(self, formattedPropertyKey, self[formattedPropertyKey])
  });
}
