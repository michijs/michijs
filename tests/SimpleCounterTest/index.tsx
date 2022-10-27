import { createCustomElement, EventDispatcher, h } from '../../src';
import { counterStyle } from '../shared/counterStyle';

export const SimpleCounter = createCustomElement('simple-counter', {
  reflectedAttributes: {
    count: 0
  },
  methods: {
    decrementCount() { this.count--; },
    incrementCount() { this.count++; },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    count() {
      this.countChanged(this.count);
    }
  },
  adoptedStyleSheets: [counterStyle],
  render() {
    return (
      <>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </>
    );
  }
});