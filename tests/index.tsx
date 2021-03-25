import { AutonomousCustomElement, h, IdGenerator, LSCustomElement, Observer } from '../src';
import { StoredAttribute } from '../src/LSElement/decorators/PropertyDecorators';
import SimpleCounter from './SimpleCounterTest';
import CounterWithReduxStore from './CounterWithReduxStoreTest';
import StoredAttributeCounter from './StoredAttributeCounterTest';
import BuiltInButton from './BuiltInButton';

@AutonomousCustomElement()
export class LsRootTestElement extends HTMLElement implements LSCustomElement {
    @StoredAttribute({ reflect: true, key: 'arrayTest', method: 'localStorage' }) arrayTest = [1, 2, 3, 4, 5]
    @Observer('arrayTest')
    test(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
    idGen = new IdGenerator();

    render() {
      return (
        <>
          <h1 id="SimpleCounter">Simple counter</h1>
          <SimpleCounter id="SimpleCounterTest" />
          <SimpleCounter id="SimpleCounterTest2" />
          <h1 id="CounterWithReduxStore">Counter with redux store</h1>
          <CounterWithReduxStore id="CounterWithReduxStoreTest" />
          <CounterWithReduxStore id="CounterWithReduxStoreTest2" />
          <h1 id="StoredAttributeCounter">Stored attribute counter</h1>
          <StoredAttributeCounter id="StoredAttributeCounterTest" />
          <StoredAttributeCounter id="StoredAttributeCounterTest2" />
          <h1 {...this.idGen.get('idGenTestTitle')}>Id Generator</h1>
          <div {...this.idGen.get('idGenTest')}>{this.idGen.getId('idGenTest')}</div>
          <div {...this.idGen.get('idGenTest2')}>{this.idGen.getId('idGenTest2')}</div>
          <h1 {...this.idGen.get('builtIn')}>Built-in component</h1>
          <BuiltInButton {...this.idGen.get('builtInButton')} text="Sample customized button" />
          <h1 {...this.idGen.get('arrays')}>Arrays</h1>
          {this.arrayTest.map(x => <div id={x.toString()} onclick={() => { this.arrayTest = [...this.arrayTest, this.arrayTest.length + 1]; }}>{x}</div>)}
        </>
      );
    }
}