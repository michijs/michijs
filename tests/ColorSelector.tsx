import { createCustomElement, css, h } from "../src";

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
    color: "#ff0000" as `#${string}`,
  },
  computedStyleSheet() {
    return {
      color: "white",
      "--example": this.color === "#ff0000" ? '"red"' : '"not red"',
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
            this.color = ev.target?.value as `#${string}`;
          }}
        />
      </span>
    );
  },
});
