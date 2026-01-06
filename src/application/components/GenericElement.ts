import { EventDispatcher } from "../../shared/classes/EventDispatcher";
import { useStyleSheet } from "../../infrastructure/styling/useStyleSheet";
import { createCustomElement } from "../../domain/component/createCustomElement";

export const GenericElement = createCustomElement("michi-generic-element", {
  lifecycle: {
    didMount() {
      // Custom didMount logic
    },
    connected() {
      // Custom connected logic
    },
    disconnected() {
      // Custom disconnected logic
    },
  },
  adoptedStyleSheets: {
    styles: useStyleSheet({ ":host": { display: "none" } }),
  },
  events: {
    elementDisconnected: new EventDispatcher<HTMLElement>(),
    elementMounted: new EventDispatcher<HTMLElement>(),
    elementConnected: new EventDispatcher<HTMLElement>(),
  },
});
