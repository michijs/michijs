import {
  Host,
  EventDispatcher,
  useIndexedDB,
  createCustomElement,
  useAsyncComputedObserve,
} from "@michijs/michijs";
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

const count = useAsyncComputedObserve(
  async () => {
    return (await storedCount.counter?.get(1))?.count ?? 0;
  },
  [storedCount],
  (await storedCount.counter?.get(1))?.count ?? 0,
);

function decrementCount() {
  storedCount.counter?.put({ count: count() - 1, id: 1 });
}
function incrementCount() {
  storedCount.counter?.put({ count: count() + 1, id: 1 });
}

export const IndexedDBCounter = createCustomElement("indexed-db-counter", {
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: { counterStyle },
  render() {
    count.subscribe(this.countChanged);

    return (
      <Host count={count}>
        <button onpointerup={decrementCount}>-</button>
        <span>{count}</span>
        <button onpointerup={incrementCount}>+</button>
      </Host>
    );
  },
});
