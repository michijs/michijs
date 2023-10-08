import { useStyleSheet } from "../css";
import { createCustomElement } from "../customElements";

export const Title = createCustomElement('michi-title', {
  lifecycle: {
    connected() {
      this.updateTitle();
    }
  },
  adoptedStyleSheets: [useStyleSheet({':host': {display: 'none'}})],
  methods: {
    updateTitle(){
      if (this.textContent)
        document.title = this.textContent;
    }
  },
  render() {
    return <slot onslotchange={this.updateTitle} />
  }
})