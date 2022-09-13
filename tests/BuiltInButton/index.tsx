import { h, AdoptedStyle, createCustomElement } from '../../src';
import { buttonStyle } from './buttonStyle';

export const BuiltInButton = createCustomElement('built-in-button', {
  extends: {
    tag: 'button', 
    class: HTMLButtonElement
  },
  reflectedAttributes: {
    text: null as string
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