// import { useStyleSheet } from "../css";
import { HistoryManager } from "../classes";
import { createCustomElement } from "../customElements";
import { wait } from "../utils";

const styles = new CSSStyleSheet();
// Jest fix
if (styles.replaceSync)
  styles.replaceSync(':host{display: none}');

export const Redirect = createCustomElement("michi-redirect", {
  reflectedAttributes: {
    to: null as string | null
  },
  lifecycle: {
    connected() {
      this.redirectTo()
    },
  },
  // Brokes unit tests
  // adoptedStyleSheets: [useStyleSheet({ ':host': { display: 'none' } })],
  methods: {
    async redirectTo() {
      await wait(0)
      if (this.to.toBoolean?.())
        HistoryManager.push(this.to.toString())
    }
  },
});
