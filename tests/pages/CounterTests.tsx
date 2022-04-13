import { h } from '../../src';
import { BuiltInButton } from '../BuiltInButton';
import { CounterWithReduxStore } from '../CounterWithReduxStoreTest';
import { SimpleCounter } from '../SimpleCounterTest';
import { StoredObservableCounter } from '../StoredObservableCounter';

export const CounterTests = () => {
  return (
    <>
      <h1> Simple counter</h1>
      <SimpleCounter oncountchanged={(ev) => { console.log(ev.detail); }} />
      <SimpleCounter />
      <h1>Counter with redux store</h1>
      <CounterWithReduxStore />
      <CounterWithReduxStore />
      <h1>Stored attribute counter</h1>
      <StoredObservableCounter />
      <StoredObservableCounter />
      <h1>Built-in component</h1>
      <BuiltInButton text="Sample customized button" />
    </>
  );
};