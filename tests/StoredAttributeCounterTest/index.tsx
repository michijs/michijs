import { h, AdoptedStyle, createCustomElement, Host, storedAttribute, EventDispatcher } from 'src';
import { counterStyle } from '../shared/counterStyle';

const storedCount = storedAttribute('count', 0);

export const StoredAttributeCounter = createCustomElement('stored-attribute-counter', {
  methods: {
    decrementCount() { storedCount.value--; },
    incrementCount() { storedCount.value++; },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    storedCount() {
      this.countChanged(storedCount.value);
    }
  },
  subscribeTo: {
    storedCount
  },
  render() {
    return (
      <Host count={storedCount.value}>
        <AdoptedStyle id="style">{counterStyle}</AdoptedStyle>
        <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
        <span id='count'>{storedCount.value}</span>
        <button id="increment-count" onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  }
});