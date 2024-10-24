import { Title } from "@michijs/michijs";
import { BuiltInButton } from "../BuiltInButton";
import { CounterWithReduxStore } from "../CounterWithReduxStore";
import { SimpleCounter } from "../SimpleCounter";
import { StoredObservableCounter } from "../StoredObservableCounter";
import { IndexedDBCounter } from "../IndexedDBCounter";

const CounterTests = () => (
  <>
    <Title>Counter tests Page</Title>
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

export default CounterTests;
