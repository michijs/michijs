import { EventDispatcher } from "../classes/EventDispatcher";
import { useStyleSheet } from "../css/useStyleSheet";
import { createCustomElement } from "../customElements/createCustomElement";

export const GenericElement = createCustomElement("michi-generic-element", {
  lifecycle: {
    didMount() {
      this.elementMounted(this);
    },
    connected() {
      this.elementConnected(this);
    },
    disconnected() {
      this.elementDisconnected(this);
    },
  },
  adoptedStyleSheets: { styles: useStyleSheet({ ':host': { display: 'none' } }) },
  events: {
    elementDisconnected: new EventDispatcher<HTMLElement>(),
    elementMounted: new EventDispatcher<HTMLElement>(),
    elementConnected: new EventDispatcher<HTMLElement>(),
  },
});