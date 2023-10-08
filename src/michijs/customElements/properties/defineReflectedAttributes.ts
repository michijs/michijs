import { setProperty } from "../../DOM/attributes/setProperty";
import {
  MichiCustomElement,
  ObservableType,
  ReflectedAttributesType,
} from "../../types";
import { formatToKebabCase } from "../../utils";
import { definePropertyFromObservable } from "./definePropertyFromObservable";

export const defineReflectedAttributes = (
  self: MichiCustomElement,
  observable: ObservableType<any>,
  reflectedAttributes?: ReflectedAttributesType,
) => {
  if (reflectedAttributes)
    for (const key in reflectedAttributes) {
      const standarizedAttributeName = formatToKebabCase(key);
      if (key !== standarizedAttributeName)
        definePropertyFromObservable(
          self,
          standarizedAttributeName,
          observable,
          key,
        );
      observable[key].subscribe?.((newValue) =>
        setProperty(self, standarizedAttributeName, newValue, {
          contextElement: self,
        }),
      );
    }
};
