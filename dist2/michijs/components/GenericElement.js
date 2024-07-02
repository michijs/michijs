// import { useStyleSheet } from "../css";
// Fixes jest error
import { EventDispatcher } from "../classes/EventDispatcher";
import { createCustomElement } from "../customElements";

const styles = new CSSStyleSheet();
// Jest fix
if (styles.replaceSync)
    styles.replaceSync(":host{display: none}");

export const GenericElement = createCustomElement("michi-generic-element", {
    lifecycle: {
        connected() {
            this.elementConnected(this);
        },
    },
    adoptedStyleSheets: { styles },
    // Brokes unit tests
    // adoptedStyleSheets: [useStyleSheet({ ':host': { display: 'none' } })],
    events: {
        elementConnected: new EventDispatcher(),
    },
});
