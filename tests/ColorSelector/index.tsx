import { AdoptedStyle, createCustomElement, css, h } from '../../src';

const style = css`
    div {
        background: var(--color);
        width: 50px;
        height: 50px;
    }
    div::before {
        content: var(--example)
    }
`;

export const ColorSelector = createCustomElement('color-selector', {
  reflectedCssVariables: {
    color: '#ff0000' as `#${string}`
  },
  computedCssVariables: {
    example() {
      return this.color === '#ff0000' ? '"red"': '"not red"';
    }
  },
  render() {
    return (
      <span>
        <AdoptedStyle id="style">{style}</AdoptedStyle>
        <input type="color" value={this.color} oninput={(ev) => {
          this.color = ev.target.value as `#${string}`;
        }} />
        <div />
      </span>
    );
  }
});