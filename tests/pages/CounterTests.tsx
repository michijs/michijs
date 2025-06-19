import { createCustomElement, If, List, Title } from "@michijs/michijs";
import { BuiltInButton } from "../BuiltInButton";
import { CounterWithReduxStore } from "../CounterWithReduxStore";
import { SimpleCounter } from "../SimpleCounter";
import { StoredObservableCounter } from "../StoredObservableCounter";
import { IndexedDBCounter } from "../IndexedDBCounter";
import { ColorSelector } from "../ColorSelector";
import { CacheCounter } from "../CacheCounter";

const TestCustomElement = createCustomElement("test-custom-element", {
  reflectedAttributes: {
    count: 1,
    arrayTest: [0, 1, 2, 3, 4, 5],
  },
  attributes: {
    showExample: true,
  },
  shadow: false,
  methods: {
    toggleShowExample() {
      this.count(this.count() + 1);
      this.showExample(!this.showExample());
    },
    onClickArray() {
      this.arrayTest.push(7, 8);
      // this.arrayTest = [0, 1, 2, 3, 6]
      // this.arrayTest.reverse();
      // this.arrayTest.pop();
      // this.arrayTest.shift();
      // Scenario
      // this.arrayTest = [6, 3, 2, 1, 0]
    },
  },
  render() {
    return (
      <>
        {this.count.compute((v) => v.toFixed(2))}
        <math display="block" onclick={this.toggleShowExample}>
          <mfrac>
            <mn>{this.arrayTest.length}</mn>
            <msqrt>
              <mn>2</mn>
            </msqrt>
          </mfrac>
        </math>
        {If(
          this.showExample,
          <div onclick={this.onClickArray}>{this.arrayTest}</div>,
          undefined,
          { as: "div" },
        )}
        <this.arrayTest.List
          as="div"
          renderItem={(item) => <div onclick={this.onClickArray}>{item}</div>}
        />
        <List
          data={this.arrayTest}
          renderItem={(item) => <div onclick={this.onClickArray}>{item}</div>}
        />
        <List
          data={this.arrayTest()}
          renderItem={(item) => <div onclick={this.onClickArray}>{item}</div>}
        />
        <ColorSelector />
      </>
    );
  },
});

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
    <h1>Cache counter</h1>
    <CacheCounter />
    <CacheCounter />
    <h1>Built-in component</h1>
    <BuiltInButton>Sample customized button</BuiltInButton>
    <TestCustomElement />
  </>
);

export default CounterTests;
