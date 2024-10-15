import { EventDispatcher } from "../classes/EventDispatcher";
import { useStyleSheet } from "../css/useStyleSheet";
import { createCustomElement } from "../customElements/createCustomElement";
import type { HTMLElements } from "../generated/htmlType";
import type { FCC } from "../types";
import { isElement } from "../typeWards/isElement";
import { getShadowRoot } from "../utils/getShadowRoot";

const MichiSlot = createCustomElement("michi-slot", {
  reflectedAttributes: {
    name: null as string | null
  },
  attributes: {
    hostElement: undefined as Element | undefined,
    defaultChildren: undefined as any
  },
  lifecycle: {
    didMount() {
      const hostElement = this.hostElement();

      const callback = (nodeList: NodeList) => {
        const name = this.name();
        Array.from(nodeList).forEach(x => {
          if ([this.nodeName, 'MICHI-GENERIC-ELEMENT', 'STYLE'].includes(x.nodeName))
            return;
          if (isElement(x)) {
            if (x.getAttribute('slot') === name) {
              this.append(x);
              this.slotchange();
              return;
            }
          } else if (!name) {
            this.append(x);
            this.slotchange();
          }
        })
      }

      if (hostElement) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0)
              callback(mutation.addedNodes)
          });
        });
        observer.observe(hostElement, {
          childList: true
        })
        callback(hostElement.childNodes)
      }
    },
  },
  adoptedStyleSheets: { styles: useStyleSheet({ ':host': { display: 'contents' } }) },
  events: {
    slotchange: new EventDispatcher<void>(),
  },
  render() {
    return <slot>{this.defaultChildren()}</slot>
  }
});

export const Slot: FCC<HTMLElements['slot']> = (attrs, context) => getShadowRoot(context?.contextElement) ? <slot {...attrs} /> : (
  <MichiSlot {...attrs} _={{
    hostElement: context?.contextElement,
    // @ts-ignore
    defaultChildren: attrs.children
  }} />
) 