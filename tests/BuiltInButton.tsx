import {
  createCustomElement,
  Host,
  useComputedObserve,
} from "@michijs/michijs";
import { buttonStyle } from "./BuiltInButton.css";
import { Slot } from "@michijs/michijs/michijs/components/Slot";

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
        margin: useComputedObserve(() => `${this.counter}px`, [this.counter]),
      },
    };
  },
  adoptedStyleSheets: { buttonStyle },
  render() {
    return (
      <Host onpointerup={() => this.counter(this.counter() + 1)}>
        <Slot />
        <span slot="text">{this.counter}</span>
      </Host>
    );
  },
});
