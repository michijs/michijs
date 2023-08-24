import {
  h,
  Host,
  EventDispatcher,
  useIndexedDB,
  createCustomElement,
  useComputedObserve,
} from "../src";
import { counterStyle } from "./shared/counterStyle";

const storedCount = useIndexedDB<{
  counter: {
    count: number;
    id: number;
  };
}>("counter", {
  counter: {
    keyPath: "id",
  },
});

const count = useComputedObserve(async () => {
  return (await storedCount.counter?.get(1))?.count ?? 0
}, [storedCount]) 

export const IndexedDBCounter = createCustomElement("indexed-db-counter", {
  methods: {
    decrementCount() {
      storedCount.counter?.put({ count: count - 1, id: 1 });
    },
    incrementCount() {
      storedCount.counter?.put({ count: count + 1, id: 1 });
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  observe: {
    async storedCount() {
      count = (await storedCount.counter?.get(1))?.count ?? 0;
      this.countChanged(count);
    },
  },
  adoptedStyleSheets: [counterStyle],
  render() {
    return (
      <Host count={count}>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  },
});
