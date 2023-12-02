import {
  createCustomElement,
  Host,
  EventDispatcher,
  useComputedObserve,
} from "@michijs/michijs";
import { counterStyle } from "./shared/counterStyle";
import { decrement, increment } from "./shared/redux/CounterSlice";
import { store } from "./shared/redux/store";

function decrementCount() {
  store.dispatch(decrement());
}
function incrementCount() {
  store.dispatch(increment());
}

export const CounterWithReduxStore = createCustomElement(
  "counter-with-redux-store",
  {
    events: {
      countChanged: new EventDispatcher<number>(),
    },
    adoptedStyleSheets: [counterStyle],
    render() {
      const count = useComputedObserve(
        () => store.getState().counterStore.count,
        [store],
      );

      return (
        <Host count={count}>
          <button onpointerup={decrementCount}>-</button>
          <span>{count}</span>
          <button onpointerup={incrementCount}>+</button>
        </Host>
      );
    },
  },
);
