import { Host, useStorage, EventDispatcher, customElement } from "../src";
import { counterStyle } from "./shared/counterStyle";

const storedCount = useStorage({
  count: 0,
});

function decrementCount() {
  storedCount.count--;
}
function incrementCount() {
  storedCount.count++;
}

export const StoredObservableCounter = customElement`stored-observable-counter`(
  {
    events: {
      countChanged: new EventDispatcher<number>(),
    },
    adoptedStyleSheets: [counterStyle],
    render() {
      storedCount.count.subscribe?.(this.countChanged);
      return (
        <Host count={storedCount.count}>
          <button onpointerup={decrementCount}>-</button>
          <span>{storedCount.count}</span>
          <button onpointerup={incrementCount}>+</button>
        </Host>
      );
    },
  },
);
