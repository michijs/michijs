import {
  createCustomElement,
  Host,
  useComputedObservePrimitive,
} from "@michijs/michijs";
import { buttonStyle } from "./BuiltInButton.css";

export const BuiltInButton = createCustomElement("built-in-button", {
  extends: {
    tag: "button",
    class: HTMLButtonElement,
  },
  reflectedAttributes: {
    counter: 0,
    type: "button",
  },
  lifecycle: {
    connected() {
      console.log("connected");
    },
    disconnected() {
      console.log("disconnected");
    },
  },
  computedStyleSheet(selector: string) {
    return {
      [selector]: {
        margin: useComputedObservePrimitive(
          () => `${this.counter}px`,
          [this.counter],
        ),
      },
    };
  },
  adoptedStyleSheets: { buttonStyle },
  render() {
    return (
      <Host onpointerup={() => this.counter(this.counter() + 1)}>
        <span slot="text">{this.counter}</span>
      </Host>
    );
  },
});
