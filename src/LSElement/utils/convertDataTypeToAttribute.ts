import { LSCustomElement } from "../types";
import { standardizePropertyName } from "../properties/standardizePropertyName";

export function convertDataTypeToAttribute(newValue: any, self: LSCustomElement, key: string) {
    const formattedKey = standardizePropertyName(key);
    switch (true) {
        case typeof newValue === 'boolean': {
            if (newValue) {
                self.setAttribute(formattedKey, '');
            } else {
                self.removeAttribute(formattedKey);
            }
            break;
        }
        default: {
            self.setAttribute(formattedKey, newValue);
        }
    }
}