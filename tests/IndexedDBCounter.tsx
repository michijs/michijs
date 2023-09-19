import {
  h,
  Host,
  EventDispatcher,
  useIndexedDB,
  createCustomElement,
  useAsyncComputedObserve,
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

const count = useAsyncComputedObserve(async () => {
  return (await storedCount.counter?.get(1))?.count ?? 0
}, [storedCount], (await storedCount.counter?.get(1))?.count ?? 0) 

export const IndexedDBCounter = createCustomElement("indexed-db-counter", {
  methods: {
    async decrementCount() {
      storedCount.counter?.put({ count: count - 1, id: 1 });
    },
    incrementCount() {
      storedCount.counter?.put({ count: count + 1, id: 1 });
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: [counterStyle],
  render() {
    count.subscribe?.(this.countChanged)
    
    return (
      <Host count={count}>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  },
});
