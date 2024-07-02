import { CEEvent, ObservableType } from "@michijs/michijs";
import { counterStyle } from "./shared/counterStyle";

interface FE<T, C = HTMLElement> {
  (
    props: {
      [k in keyof T]: T[k] extends CEEvent<infer E>
        ? (detail: E) => boolean
        : ObservableType<T[k]>;
    },
    context: C,
  ): JSX.Element;
}

const SimpleCounterV2: FE<{
  count: number;
  oncountchanged: CEEvent<number>;
}> = ({ count, oncountchanged }, e) => {
  count(0);

  function decrementCount() {
    count(count() - 1);
  }

  function incrementCount() {
    count(count() + 1);
  }

  count.subscribe(oncountchanged);

  return (
    <>
      <button onpointerup={decrementCount}>-</button>
      <span>{count}</span>
      <button onpointerup={incrementCount}>+</button>
    </>
  );
};
