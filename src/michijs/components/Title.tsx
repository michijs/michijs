// import { useStyleSheet } from "../css";
import { createCustomElement } from "../customElements";

export const Title = createCustomElement("michi-title", {
  lifecycle: {
    didConstruct(){
      const styles = new CSSStyleSheet();
      styles.replaceSync(':host{display: none}');
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
