import { Host, AutonomousCustomElement, h, AdoptedStyle, EventDispatcher, CustomEventDispatcher, LSCustomElement, CustomElementWrapper, Observer, Store } from '../../src';
import css from '../Shared/Counter.css';
import { decrement, increment } from '../shared/redux/CounterSlice';
import { store, StoreType } from '../shared/redux/store';
import { MyCounterAttributes } from '../Types';

@AutonomousCustomElement()
export class CounterWithReduxStore extends HTMLElement implements LSCustomElement {
  @EventDispatcher() countChanged: CustomEventDispatcher<number>;
  @Store(store) reduxStore: StoreType;

  @Observer('reduxStore')
  onCountChanged(newValue: StoreType, _oldValue: StoreType) {
    this.countChanged.dispatch(newValue.counterStore.count);
  }

  decrementCount() {
    store.dispatch(decrement());
  }

  incrementCount() {
    store.dispatch(increment());
  }

  render() {
    return (
      <Host count={this.reduxStore.counterStore.count}>
        <AdoptedStyle id="style">{css}</AdoptedStyle>
        <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
        <span id='count'>{this.reduxStore.counterStore.count}</span>
        <button id="increment-count" onpointerup={this.incrementCount}>+</button>
      </Host>
    );
  }
}

export default CustomElementWrapper<MyCounterAttributes>()(CounterWithReduxStore);