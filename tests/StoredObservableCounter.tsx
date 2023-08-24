import {
  h,
  Host,
  useStorage,
  EventDispatcher,
  customElement,
} from "../src";
import { counterStyle } from "./shared/counterStyle";

const storedCount = useStorage({
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
    adoptedStyleSheets: [counterStyle],
    render() {
      storedCount.count.subscribe?.(() => {
        this.countChanged(storedCount.count);
      })
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
