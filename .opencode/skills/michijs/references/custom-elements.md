# Custom Elements Reference

## `createCustomElement`

Source: `src/infrastructure/dom/custom-elements/createCustomElement.tsx:34`

```ts
function createCustomElement<O extends MichiElementOptions>(
  tag: `${string}-${string}`,
  options?: NoExtraProperties<MichiElementOptions, O> & ThisType<MichiElementSelf<O>>,
): MichiElementClass<O>;
```

The `ThisType<MichiElementSelf<O>>` brand makes `this` inside `methods`, `render`, `lifecycle`, and `computedStyleSheet` strongly typed against the options you supplied.

### Options shape

```ts
interface MichiElementOptions {
  attributes?:           Record<string, PrimitiveType | AnyObject>;
  reflectedAttributes?:  Record<string, PrimitiveType | AnyObject>;  // synced with HTML attrs
  methods?:              Record<string, (...args: any[]) => any>;
  events?:               Record<string, EventDispatcher<unknown>>;
  cssVariables?:         CSSObject;
  reflectedCssVariables?:CSSObject;
  computedStyleSheet?:   (selector: string) => CSSObject;
  adoptedStyleSheets?:   Record<string, CSSStyleSheet | ((tag: string) => CSSStyleSheet)>;
  formAssociated?:       boolean;                                    // default false
  shadow?:               false | ShadowRootInit;                     // autonomous: {mode:"open"}; built-in: false
  extends?:              { tag: keyof HTMLElements; class: typeof HTMLElement };
  lifecycle?:            Lifecycle & LifecycleInternals;
  render?:               () => JSX.Element;
}
```

### `this` inside the element

```ts
type MichiElementSelf<O> =
  & { [k in keyof O.attributes]:           ObservableProxyPort<O.attributes[k]> }
  & { [k in keyof O.reflectedAttributes]:  ObservableProxyPort<O.reflectedAttributes[k]> }
  & { [k in keyof O.cssVariables]:         ObservableProxyPort<O.cssVariables[k]> }
  & { [k in keyof O.reflectedCssVariables]:ObservableProxyPort<O.reflectedCssVariables[k]> }
  & O.methods
  & CustomElementEvents<O.events>          // each event becomes (detail?: T) => boolean
  & MichiProperties                        // $michi, child(), idGen, render
  & (O.extends extends {class: infer E} ? InstanceType<E> : HTMLElement);
```

So:

- `this.count` is a callable observable: `this.count()` reads, `this.count(n)` writes, `.subscribe(fn)` listens.
- `this.increment()` is your method.
- `this.countChanged(42)` dispatches the event (returns boolean).
- `this.child("button")` queries shadow DOM (or light DOM if no shadow).
- `this.idGen("key")` returns a deterministic unique id (useful for `for`/`id` pairs).
- `this.$michi.internals` is `ElementInternals` when `formAssociated: true`.

### Lifecycle order

```
willConstruct → didConstruct → connected → willMount → render() → didMount
                                       ↑                            ↓
                                       │            (every detach) disconnected
                                       │                            ↓
                                       └────────── (only when removed from document) didUnmount
```

Other callbacks:

- `willReceiveAttribute(name, newValue, oldValue)` — fires for any HTML attribute change.
- `adopted(oldDoc, newDoc)` — moved across documents.
- Form-associated only (`formAssociated: true`):
  - `formAssociated(form)`
  - `formDisabled(disabled)`
  - `formReset()`
  - `formStateRestore(state, mode)`

`willMount` fires **once** per instance; `connected` / `disconnected` fire on every (re)attach.

## Reflected attributes — kebab-case rule

Internally:

```ts
static get observedAttributes() {
  return Object.keys({...reflectedAttributes, ...reflectedCssVariables})
    .map(formatToKebabCase);
}
```

JS prop is camelCase (`myCount`), HTML attribute is kebab-case (`my-count`), JSX prop uses kebab-case (`<MyEl my-count={3}/>`). **Cannot initialize a reflected attribute with `true`.**

## Form-associated example

```tsx
import {
  createCustomElement, EventDispatcher, ElementInternals, useComputedObserve,
} from "@michijs/michijs";
import { counterStyle } from "./counterStyle";

export const A11YCounter = createCustomElement("a11y-counter", {
  formAssociated: true,
  attributes:          { value: 0 },
  reflectedAttributes: { count: 0 },
  events: { countChanged: new EventDispatcher<number>() },
  methods: {
    decrementCount() { if (!this.matches(":disabled")) this.value(this.value() - 1); },
    incrementCount() { if (!this.matches(":disabled")) this.value(this.value() + 1); },
  },
  lifecycle: {
    willMount()       { this.value = this.count; },
    formReset()       { this.value = this.count; },
    formAssociated(f) { console.log("form:", f); },
  },
  adoptedStyleSheets: { counterStyle },
  render() {
    this.value.subscribe(this.countChanged);

    const errorMessage = useComputedObserve(
      () => this.value() > 0 ? undefined : "Value should be > 0",
      [this.value],
    );

    return (
      <ElementInternals
        formValue={this.value.compute(v => v.toString())}
        errorMessage={errorMessage}
      >
        <button type="button" onpointerup={this.decrementCount}>-</button>
        <span>{this.value}</span>
        <button type="button" onpointerup={this.incrementCount}>+</button>
      </ElementInternals>
    );
  },
});
```

## Built-in element extension

```tsx
import { createCustomElement, Host, useComputedObserve } from "@michijs/michijs";

export const BuiltInButton = createCustomElement("built-in-button", {
  extends: { tag: "button", class: HTMLButtonElement },
  reflectedAttributes: { counter: 0, type: "button" },
  // shadow defaults to false; computed CSS scoped via generated class
  computedStyleSheet(selector) {
    return { [selector]: { margin: useComputedObserve(() => `${this.counter}px`) } };
  },
  render() {
    return <Host onpointerup={() => this.counter(this.counter() + 1)}>Click {this.counter}</Host>;
  },
});
```

Usage:
```html
<button is="built-in-button" counter="0"></button>
```

Safari requires the `michi-generic-element` polyfill for built-in extensions; support is partial.

## Tagged-template form

Source: `src/infrastructure/dom/custom-elements/customElement.tsx:10`

```tsx
import { customElement } from "@michijs/michijs";
export const Cache = customElement`cache-counter`({ /* same options object */ });
```

## `Host` component

Sets attributes/event listeners on the host element from inside `render()`:

```tsx
render() {
  return (
    <Host onclick={this.increment} class="counter">
      <span>{this.count}</span>
    </Host>
  );
}
```

## `EventDispatcher`

```ts
class EventDispatcher<T> {
  constructor(eventInit?: EventInit);
  init(name: string): void;                       // called by createCustomElement
  dispatch(target: Element, detail?: T): boolean;
}
```

Inside the element, `this.<eventName>(detail)` is a typed callable that dispatches the event. Names are lowercased (`countChanged` → `countchanged`). Listen via JSX prop `oncountchanged={(ev: CustomEvent<number>) => …}`.

A common pattern:

```ts
this.value.subscribe(this.countChanged);   // re-emit value as event
```
