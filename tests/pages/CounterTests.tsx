import { h, idGenerator } from '../../src';
import { BuiltInButton } from '../BuiltInButton';
import { CounterWithReduxStore } from '../CounterWithReduxStoreTest';
import { SimpleCounter } from '../SimpleCounterTest';
import { StoredAttributeCounter } from '../StoredAttributeCounterTest';

export const CounterTests = () => {
  const idGen = idGenerator();
  return (
    <>
      <h1 id="SimpleCounter" > Simple counter</h1>
      <SimpleCounter oncountchanged={(ev) => { console.log(ev.detail); }} id="SimpleCounterTest" />
      <SimpleCounter id="SimpleCounterTest2" />
      <h1 id="CounterWithReduxStore">Counter with redux store</h1>
      <CounterWithReduxStore id="CounterWithReduxStoreTest" />
      <CounterWithReduxStore id="CounterWithReduxStoreTest2" />
      <h1 id="StoredAttributeCounter">Stored attribute counter</h1>
      <StoredAttributeCounter id="StoredAttributeCounterTest" />
      <StoredAttributeCounter id="StoredAttributeCounterTest2" />
      <h1 {...idGen.get('idGenTestTitle')}>Id Generator</h1>
      <div {...idGen.get('idGenTest')}>{idGen.getId('idGenTest')}</div>
      <div {...idGen.get('idGenTest2')}>{idGen.getId('idGenTest2')}</div>
      <h1 {...idGen.get('builtIn')}>Built-in component</h1>
      <BuiltInButton id='builtInButton' text="Sample customized button" />
    </>
  );
};