import { createCustomElement, EventDispatcher } from "@michijs/michijs";
import { counterStyle } from "./shared/counterStyle";

export const SimpleCounter = createCustomElement("simple-counter", {
  reflectedAttributes: {
    count: 0,
  },
  methods: {
    decrementCount() {
      this.count(this.count() - 1);
    },
    incrementCount() {
      this.count(this.count() + 1);
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: [counterStyle],
  render() {
    this.count.subscribe(this.countChanged);
    return (
      <>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </>
    );
  },
});
