import { h, createCustomElement, Host, EventDispatcher } from '../src';
import { counterStyle } from './shared/counterStyle';
import { decrement, increment } from './shared/redux/CounterSlice';
import { store } from './shared/redux/store';

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
  adoptedStyleSheets: [counterStyle],
  render() {
    return (
      <Host count={this.count()}>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count()}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  }
});