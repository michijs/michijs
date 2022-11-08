import { createCustomElement, createComputedStyleSheet, css, h } from '../src';

const style = css`
    :host {
        background: var(--color);
        width: 50px;
        height: 50px;
        display: flex;
    }
    :host::before {
        content: var(--example)
    }
`;

const computedStyleSheet = createComputedStyleSheet<{ color: string }>((component) => ({
  [component.cssSelector]: {
    '--example': component.color === '#ff0000' ? '"red"' : '"not red"'
  }
}))

export const ColorSelector = createCustomElement('color-selector', {
  reflectedCssVariables: {
    color: '#ff0000' as `#${string}`
  },
  computedStyleSheets() {
    return [
      computedStyleSheet(this)
    ]
  },
  adoptedStyleSheets: [style],
  render() {
    return (
      <span>
        <input type="color" value={this.color} oninput={(ev) => {
          this.color = ev.target.value as `#${string}`;
        }} />
      </span >
    );
  }
});