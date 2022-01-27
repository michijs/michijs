import { h, AdoptedStyle, createCustomElement, Host, storedObservable, EventDispatcher } from '../../src';
import { counterStyle } from '../shared/counterStyle';

const storedCount = storedObservable({
  count: 0,
});

export const StoredObservableCounter = createCustomElement('stored-observable-counter', {
  methods: {
    decrementCount() { storedCount.count--; },
    incrementCount() { storedCount.count++; },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    storedCount() {
      this.countChanged(storedCount.count);
    }
  },
  subscribeTo: {
    storedCount
  },
  render() {
    return (
      <Host count={storedCount.count}>
        <AdoptedStyle id="style">{counterStyle}</AdoptedStyle>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{storedCount.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  }
});