import { createCustomElement, Host, useComputedObserve } from "../src";
import { buttonStyle } from "./BuiltInButton.css";

export const BuiltInButton = createCustomElement("built-in-button", {
  extends: {
    tag: "button",
    class: HTMLButtonElement,
  },
  reflectedAttributes: {
    counter: 0,
  },
  computedStyleSheet(){
    return {
      margin: useComputedObserve(() => `${this.counter}px`, [this.counter])
    }
  },
  adoptedStyleSheets: [buttonStyle],
  render() {
    return <Host onpointerup={() => this.counter++}>{this.counter}</Host>;
  },
});
