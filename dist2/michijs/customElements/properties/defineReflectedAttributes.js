import { getAttributeValue } from "../../DOM/attributes/getAttributeValue";
import { formatToKebabCase } from "../../utils";
import { definePropertyFromObservable } from "./definePropertyFromObservable";

/**
 * @typedef {import('../../types').MichiCustomElement} MichiCustomElement
 * @typedef {import('../../types').ObservableType} ObservableType
 * @typedef {import('../../types').ReflectedAttributesType} ReflectedAttributesType
 */





/**
 * @param {MichiCustomElement} self
 * @param {ObservableType<*>} observable
 * @param {ReflectedAttributesType} [reflectedAttributes]
 */
export const defineReflectedAttributes = (self, observable, reflectedAttributes) => {
    if (reflectedAttributes)
        for (const key in reflectedAttributes) {
            const standarizedAttributeName = formatToKebabCase(key);
            // Setting the specific element initial value -- only happens if attribute was set on html
            if (self.hasAttribute(standarizedAttributeName))
                observable[key] = getAttributeValue(self.getAttribute(standarizedAttributeName));
            if (key !== standarizedAttributeName)
                definePropertyFromObservable(self, standarizedAttributeName, observable, key);
        }
};
