import { createCustomElement, Host, EventDispatcher, useComputedObserve } from "../src";
import { counterStyle } from "./shared/counterStyle";
import { decrement, increment } from "./shared/redux/CounterSlice";
import { store } from "./shared/redux/store";

export const CounterWithReduxStore = createCustomElement(
  "counter-with-redux-store",
  {
    methods: {
      count() {
        return store.getState().counterStore.count;
      },
      decrementCount() {
        store.dispatch(decrement());
      },
      incrementCount() {
        store.dispatch(increment());
      },
    },
    events: {
      countChanged: new EventDispatcher<number>(),
    },
    adoptedStyleSheets: [counterStyle],
    render() {
      const count = useComputedObserve(() => store.getState().counterStore.count, [store])

      return (
        <Host count={count}>
          <button onpointerup={this.decrementCount}>-</button>
          <span>{count}</span>
          <button onpointerup={this.incrementCount}>+</button>
        </Host>
      );
    },
  },
);
