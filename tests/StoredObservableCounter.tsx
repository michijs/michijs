import {
  h,
  Host,
  storedObservable,
  EventDispatcher,
  customElement,
} from "../src";
import { counterStyle } from "./shared/counterStyle";

const storedCount = storedObservable({
  count: 0,
});

export const StoredObservableCounter = customElement`stored-observable-counter`(
  {
    methods: {
      decrementCount() {
        storedCount.count--;
      },
      incrementCount() {
        storedCount.count++;
      },
    },
    events: {
      countChanged: new EventDispatcher<number>(),
    },
    observe: {
      storedCount() {
        this.countChanged(storedCount.count);
      },
    },
    subscribeTo: {
      storedCount,
    },
    adoptedStyleSheets: [counterStyle],
    render() {
      return (
        <Host count={storedCount.count}>
          <button onpointerup={this.decrementCount}>-</button>
          <span>{storedCount.count}</span>
          <button onpointerup={this.incrementCount}>+</button>
        </Host>
      );
    },
  },
);
