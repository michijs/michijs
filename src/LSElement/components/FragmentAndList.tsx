import { createStyleSheet } from '../css/createStyleSheet';
import { createCustomElement } from '../customElements';
import { h } from '../h';

const FragmentAndListStyle = createStyleSheet({
  ':host': {
    display: 'contents',
    borderRadius: 'inherit'
  }
});

export const Fragment = createCustomElement('ls-fragment', {
  adoptedStyleSheets: [FragmentAndListStyle],
  render() {
    return <slot />;
  }
});

export const ListElement = createCustomElement('ls-list', {
  adoptedStyleSheets: [FragmentAndListStyle],
  render() {
    return <slot />;
  }
});