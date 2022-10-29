import { createCustomElement } from '../src';
import { buttonStyle } from './BuiltInButton.css';

export const BuiltInButton = createCustomElement('built-in-button', {
  extends: {
    tag: 'button',
    class: HTMLButtonElement
  },
  reflectedAttributes: {
    text: null as string
  },
  adoptedStyleSheets: [buttonStyle],
  render() {
    return this.text;
  }
});