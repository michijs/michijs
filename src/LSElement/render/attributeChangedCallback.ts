import { LSCustomElement } from "../types";
import { getAttributeValue } from "../utils/getAttribute";

export function attributeChangedCallback(self: LSCustomElement, name: string, oldValue, newValue) {
    if (newValue != oldValue && newValue != self[name]) {
        if (self.componentWillReceiveAttribute) {
            self.componentWillReceiveAttribute(name, oldValue, newValue);
        }
        self[name] = getAttributeValue(newValue);
    }
}