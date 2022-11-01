import { createStyleSheet } from '../css/createStyleSheet';
import { createCustomElement } from '../customElements';
import { h } from '../h';

const FragmentAndListStyle = createStyleSheet({
  ':host': {
    display: 'contents',
    ',slot': {
      borderRadius: 'inherit'
    }
  },
});

export const Fragment = createCustomElement('michi-fragment', {
  adoptedStyleSheets: [FragmentAndListStyle],
  render() {
    return <slot />;
  }
});

export const ListElement = createCustomElement('michi-list', {
  adoptedStyleSheets: [FragmentAndListStyle],
  render() {
    return <slot />;
  }
});