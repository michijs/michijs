import { isCustomElement } from "./isCustomElement";

export function isCustomElementWithoutShadowRoot(self: Element) {
    return isCustomElement(self) && self.shadowRoot === null;
}