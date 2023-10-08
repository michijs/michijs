// import { useStyleSheet } from "../css";
import { createCustomElement } from "../customElements";

const styles = new CSSStyleSheet();
// Jest fix
if (styles.replaceSync)
  styles.replaceSync(':host{display: none}');

export const Title = createCustomElement("michi-title", {
  lifecycle: {
    didConstruct() {
      this.shadowRoot!.adoptedStyleSheets = [styles]
    },
    connected() {
      this.updateTitle();
    },
  },
  // Brokes unit tests
  // adoptedStyleSheets: [useStyleSheet({ ':host': { display: 'none' } })],
  methods: {
    updateTitle() {
      if (this.textContent)
        document.title = this.textContent;
    }
  },
  render() {
    return <slot onslotchange={this.updateTitle} />;
  },
});
