import { createCustomElement, css, useComputedObserve } from "../src";

const style = css`
    span {
        background: var(--color);
        width: 50px;
        height: 50px;
        display: flex;
    }
    span::before {
        content: var(--example)
    }
`;

export const ColorSelector = createCustomElement("color-selector", {
  reflectedCssVariables: {
    color: "#ff0000a1" as `#${string}`,
  },
  shadow: false,
  computedStyleSheet() {
    return {
      color: "white",
      "--example": useComputedObserve(
        () => (this.color() === "#ff0000" ? '"red"' : '"not red"'),
        [this.color],
      ),
    };
  },
  adoptedStyleSheets: [style],
  render() {
    return (
      <span>
        <input
          type="color"
          value={this.color}
          oninput={(ev) => {
            this.color(ev.target?.value as `#${string}`);
          }}
        />
      </span>
    );
  },
});
