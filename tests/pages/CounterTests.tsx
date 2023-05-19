import { h } from "../../src";
import { BuiltInButton } from "../BuiltInButton";
import { CounterWithReduxStore } from "../CounterWithReduxStore";
import { SimpleCounter } from "../SimpleCounter";
import { StoredObservableCounter } from "../StoredObservableCounter";
import { IndexedDBCounter } from "../IndexedDBCounter";

export const CounterTests = () => (
  <>
    <h1> Simple counter</h1>
    <SimpleCounter
      oncountchanged={(ev) => {
        console.log(ev.detail);
      }}
    />
    <SimpleCounter />
    <h1>Counter with redux store</h1>
    <CounterWithReduxStore />
    <CounterWithReduxStore />
    <h1>IndexedDB counter</h1>
    <IndexedDBCounter />
    <IndexedDBCounter />
    <h1>Stored attribute counter</h1>
    <StoredObservableCounter />
    <StoredObservableCounter />
    <h1>Built-in component</h1>
    <BuiltInButton>Sample customized button</BuiltInButton>
  </>
);
