import { LSCustomElement } from "../types";

export function disconnectedCallback(self: LSCustomElement) {
    if (self.componentDidUnmount) {
        self.componentDidUnmount();
    }
}