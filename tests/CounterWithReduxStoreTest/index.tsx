import { h, AdoptedStyle, createCustomElement, Host, EventDispatcher } from 'src';
import { counterStyle } from '../shared/counterStyle';
import { decrement, increment } from '../shared/redux/CounterSlice';
import { store } from '../shared/redux/store';

export const CounterWithReduxStore = createCustomElement('counter-with-redux-store', {
  methods: {
    count() { return store.getState().counterStore.count; },
    decrementCount() { store.dispatch(decrement()); },
    incrementCount() { store.dispatch(increment()); },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    store() {
      this.countChanged(this.count());
    }
  },
  subscribeTo: {
    store
  },
  render() {
    return (
      <Host count={this.count()}>
        <AdoptedStyle id="style">{counterStyle}</AdoptedStyle>
        <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
        <span id='count'>{this.count()}</span>
        <button id="increment-count" onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  }
});