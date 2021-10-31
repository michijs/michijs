import { h, AdoptedStyle, createCustomElement } from '../../src';
import { buttonStyle } from './buttonStyle';

export const BuiltInButton = createCustomElement({ tag: 'built-in-button', extends: 'button', class: HTMLButtonElement }, {
  reflectedAttributes: {
    text: null
  },
  render() {
    return (
      <>
        <AdoptedStyle id="style">{buttonStyle}</AdoptedStyle>
        {this.text}
      </>
    );
  }
});