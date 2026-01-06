import { getAttributeValue } from "../../../infrastructure/dom/attributes/getAttributeValue";
import type {
  MichiCustomElement,
  ObservableType,
  ReflectedAttributesType,
} from "../../../shared/types/types";
import { formatToKebabCase } from "../../../shared/utils/formatToKebabCase";
import { definePropertyFromObservable } from "./definePropertyFromObservable";

export const defineReflectedAttributes = (
  self: MichiCustomElement,
  observable: ObservableType<any>,
  reflectedAttributes?: ReflectedAttributesType,
): void => {
  if (reflectedAttributes)
    for (const key in reflectedAttributes) {
      const standarizedAttributeName = formatToKebabCase(key);
      // Setting the specific element initial value -- only happens if attribute was set on html
      if (self.hasAttribute(standarizedAttributeName))
        observable[key] = getAttributeValue(
          self.getAttribute(standarizedAttributeName),
        );
      if (key !== standarizedAttributeName)
        definePropertyFromObservable(
          self,
          standarizedAttributeName,
          observable,
          key,
        );
    }
};
