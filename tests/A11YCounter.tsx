import {
  createCustomElement,
  EventDispatcher,
  ElementInternals,
  useComputedObserve,
} from "@michijs/michijs";
import { counterStyle } from "./shared/counterStyle";

export const A11YCounter = createCustomElement("a11y-counter", {
  formAssociated: true,
  attributes: {
    value: 0,
  },
  reflectedAttributes: {
    count: 0,
  },
  methods: {
    decrementCount() {
      if (!this.matches(":disabled")) this.value(this.value() - 1);
    },
    incrementCount() {
      if (!this.matches(":disabled")) this.value(this.value() + 1);
    },
  },
  lifecycle: {
    willMount() {
      this.value = this.count;
    },
    formAssociatedCallback(form) {
      console.log("Form associated", form);
    },
    formDisabledCallback(disabled) {
      console.log("Form disabled", disabled);
    },
    formResetCallback() {
      this.value = this.count;
      console.log("Form reset");
    },
    formStateRestoreCallback(state, mode) {
      console.log("Form state restore", state, mode);
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: { counterStyle },
  render() {
    this.value.subscribe(this.countChanged);
    this.count.subscribe(() => this.value(this.count()));
    const errorMessage = useComputedObserve(
      () => (this.value() > 0 ? undefined : "Value should be greater than 0"),
      [this.value],
    );
    return (
      <ElementInternals
        ariaValueText={this.value.compute(v => v.toString())}
        formValue={this.value.compute(v => v.toString())}
        errorMessage={errorMessage}
      >
        <button type="button" onpointerup={this.decrementCount}>
          -
        </button>
        <span>{this.value}</span>
        <button type="button" onpointerup={this.incrementCount}>
          +
        </button>
      </ElementInternals>
    );
  },
});
