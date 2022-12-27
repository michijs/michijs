import { h, Host, EventDispatcher, indexedDBObservable, createCustomElement } from '../src';
import { counterStyle } from './shared/counterStyle';

const storedCount = indexedDBObservable<{
  counter: {
    count: number,
    id: number
  }
}>('counter', {
  counter: {
    keyPath: 'id'
  }
});

export const IndexedDBCounter = createCustomElement('indexed-db-counter', {
  attributes: {
    count: (await storedCount.counter?.get(1))?.count ?? 0
  },
  methods: {
    decrementCount() { storedCount.counter?.put({ count: this.count - 1, id: 1 }) },
    incrementCount() { storedCount.counter?.put({ count: this.count + 1, id: 1 }) },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    async storedCount() {
      this.count = (await storedCount.counter?.get(1))?.count ?? 0;
      this.countChanged(this.count);
    }
  },
  subscribeTo: {
    storedCount
  },
  adoptedStyleSheets: [counterStyle],
  render() {
    return (
      <Host count={this.count}>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </Host >
    );
  }
});