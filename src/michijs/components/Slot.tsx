import { EventDispatcher } from "../classes/EventDispatcher";
import { useStyleSheet } from "../css/useStyleSheet";
import { createCustomElement } from "../customElements/createCustomElement";
import type { HTMLElements } from "../generated/htmlType";
import type { FCC } from "../types";
import { isElement } from "../typeWards/isElement";
import { getShadowRoot } from "../utils/getShadowRoot";

const MichiSlot = createCustomElement("michi-slot", {
  reflectedAttributes: {
    name: null as string | null,
  },
  attributes: {
    hostElement: undefined as Element | undefined,
    defaultChildren: undefined as any,
  },
  lifecycle: {
    didMount() {
      const hostElement = this.hostElement();

      const callback = (nodeList: NodeList) => {
        const name = this.name();
        // Doesnt work on gh actions for some reason
        // for (const x of nodeList) {
        nodeList.values().forEach(x => {
          if (
            [this.nodeName, "MICHI-GENERIC-ELEMENT", "STYLE"].includes(
              x.nodeName,
            )
          )
            return;
          if (!x.contains(this))
            if (isElement(x)) {
              if (x.getAttribute("slot") === name) {
                this.append(x);
                this.slotchange();
                return;
              }
            } else if (!name) {
              this.append(x);
              this.slotchange();
            }
        })
      };

      if (hostElement) {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations)
            if (mutation.addedNodes.length > 0) callback(mutation.addedNodes);
        });
        observer.observe(hostElement, {
          childList: true,
        });
        callback(hostElement.childNodes);
      }
    },
  },
  adoptedStyleSheets: {
    styles: useStyleSheet({ ":host": { display: "contents" } }),
  },
  events: {
    slotchange: new EventDispatcher<void>(),
  },
  render() {
    return <slot>{this.defaultChildren()}</slot>;
  },
});

/**
 * Checks if the context element has a shadow root and renders either a standard <slot> or a MichiSlot custom element, passing along attributes and children.
 * When nodes are added, it checks if they have a slot attribute matching the slot's name or if no name is set, appending them to the MichiSlot and triggering a slotchange event.
 * The main difference between the standard slot aned the MichiSlot is that the parent does not have a shadow DOM so **every** child appended to the parent is moved to the slot.
 */
export const Slot: FCC<HTMLElements["slot"]> = (attrs, contextElement) =>
  getShadowRoot(contextElement) ? (
    <slot {...attrs} />
  ) : (
    <MichiSlot
      {...attrs}
      _={{
        hostElement: contextElement,
        // @ts-ignore
        defaultChildren: attrs.children,
      }}
    />
  );
