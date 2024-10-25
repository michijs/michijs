<div align="center">
  <img width="500px" alt="Michijs Logo" src="https://raw.githubusercontent.com/michijs/art/main/logo-with-background-strait-round.png">
  <p>A lightweight vanilla JavaScript library for creating Web Components</p>

  [![Open in Visual Studio Code][open-in-vscode]][open-in-vscode-url] 
  ![npm][version] 
  [![license][github-license]][github-license-url] 
  ![npm][npm-downloads] 
  ![npm][repo-size]
  ![npm][minzipped-size]
  [![Tests](https://github.com/michijs/michijs/actions/workflows/tests.yml/badge.svg)](https://github.com/michijs/michijs/actions/workflows/tests.yml)

</div>

## Why *MichiJS*?

| Feature | MichiJS | React | StencilJS | SvelteJS | VueJS | VanillaJS |
|--|--|--|--|--|--|--|
| Real DOM preferred over virtual DOM | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Dynamic constructable stylesheets | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| General constructable stylesheets | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| JavaScript templates preferred over compiled text | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Templates with [JSX](https://es.reactjs.org/docs/introducing-jsx.html) | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| [Element internals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) support | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| IDE-friendly without special extensions | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ |
| Attribute vs property distinction in JSX/templates | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Standard Web Components | ✅ | ⭕ <sup>1</sup> | ✅ | ✅ | ⭕ <sup>2</sup> | ✅ |
| Observables/stores support | ✅ | ⭕ <sup>3</sup> | ⭕ <sup>3</sup> | ⭕ <sup>3</sup> | ⭕ <sup>3</sup> | ❌ |
| [Esbuild](https://esbuild.github.io/) as default bundler | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| [TypeScript](https://www.typescriptlang.org) support | ✅ | ✅ | ✅ | ✅ | ✅ | ⭕ <sup>3</sup> |
| Reactive programming | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Automatic component type generation | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Native attributes/events support | ✅ | ❌ <sup>4</sup> | ⭕ <sup>5</sup> | ✅ | ✅ | ✅ |
| [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) support | ✅ | ❌ | ✅ | ✅ | ❌ | ✅ |
| Custom built-in elements support | ✅ | ❌ | ❌ | ✅ | ❌ | ✅ |
| Cross-framework compatibility | ✅ | ❌ | ✅ | ⭕ <sup>6</sup> | ❌ | ✅ |

✅ = Fully implemented  
⭕ = Partially implemented  
❌ = Not implemented

<details>
  <summary>More details</summary>
  <ol>
    <li>React supports Web Components starting from version 19.</li>
    <li>Vue has partial support for Web Components, but usage requires workarounds or third-party packages.</li>
    <li>Requires external packages, not a unique-state-first approach.</li>
    <li>React only supports properties and synthetic events.</li>
    <li>StencilJS supports only properties.</li>
    <li>Svelte components can be shared only through custom elements.</li>
  </ol>
</details>

## Getting Started

You can start by using [this template](https://github.com/michijs/michijs-template) to quickly set up your project. Alternatively, you can explore the [Code Sandbox](https://githubbox.com/michijs/michijs-storybook-template/tree/master) version for a hands-on example.
  
## Creating components

### Your first custom element
MichiJS custom elements are plain objects.

New components can be created using the `jsx/tsx` extension, such as `MyCounter.tsx`.

```tsx
import { createCustomElement, EventDispatcher } from "@michijs/michijs";
import { counterStyle } from "./counterStyle";

export const SimpleCounter = createCustomElement("simple-counter", {
  reflectedAttributes: {
    count: 0,
  },
  methods: {
    decrementCount() {
      this.count(this.count() - 1);
    },
    incrementCount() {
      this.count(this.count() + 1);
    },
  },
  events: {
    countChanged: new EventDispatcher<number>(),
  },
  adoptedStyleSheets: { counterStyle },
  render() {
    this.count.subscribe(this.countChanged);
    return (
      <>
        <button onpointerup={this.decrementCount}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.incrementCount}>+</button>
      </>
    );
  },
});
```

Note: the `.tsx` extension is required, as this is the standard for TypeScript classes that use JSX.

To use this component, just use it like any other HTML element:

```tsx
import '../Counter';

<my-counter oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)} />
```

Or if you are using JSX
```tsx
import Counter from '../Counter';

<Counter oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)} />
```

### Component Structure
A component consists of the following properties:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th colspan="3">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>attributes</td>
      <td colspan="3">Allows defining attributes.</td>
    </tr>
    <tr>
      <td>reflectedAttributes</td>
      <td colspan="3">Allows defining <a href="https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr">reflected attributes</a> and follows the Kebab case. A reflected attribute cannot be initialized with a true value.</td>
    </tr>
    <tr>
      <td>methods</td>
      <td colspan="3">Methods are functions that notify changes at the time of making the change.</td>
    </tr>
    <tr>
      <td>adoptedStyleSheets</td>
      <td colspan="3">Allows using <a href="https://developers.google.com/web/updates/2019/02/constructable-stylesheets">Constructable Stylesheets</a>. Remember that you need to use Shadow DOM to utilize Constructable Stylesheets; otherwise, it will return a style tag.</td>
    </tr>
    <tr>
      <td>cssVariables</td>
      <td colspan="3">Allows defining CSS variables.</td>
    </tr>
    <tr>
      <td>reflectedCssVariables</td>
      <td colspan="3">Allows defining reflected CSS variables and follows the Kebab case. A reflected CSS variable cannot be initialized with a true value.</td>
    </tr>
    <tr>
      <td>computedStyleSheet</td>
      <td colspan="3">Allows defining a Constructable Stylesheet that depends on the component's state. When there is no shadow root, the style will be reflected in the style attribute.</td>
    </tr>
    <tr>
      <td>render</td>
      <td colspan="3">Function that renders the component.</td>
    </tr>
    <tr>
      <td rowspan="15">lifecycle</td>
      <tr>
        <td rowspan="9">Custom Element related</td>
        <tr>
          <td>willConstruct</td>
          <td>This method is called at the start of the constructor.</td>
        </tr>
        <tr>
          <td>didConstruct</td>
          <td>This method is called at the end of the constructor.</td>
        </tr>
        <tr>
          <td>connected</td>
          <td>This method is called when a component is connected to the DOM.</td>
        </tr>
        <tr>
          <td>willMount</td>
          <td>This method is called right before a component mounts.</td>
        </tr>
        <tr>
          <td>didMount</td>
          <td>This method is called after the component has mounted.</td>
        </tr>
        <tr>
          <td>willReceiveAttributeCallback</td>
          <td>This method is called before a component does anything with an attribute.</td>
        </tr>
        <tr>
          <td>disconnected</td>
          <td>This method is called when a component is disconnected from the DOM.</td>
        </tr>
        <tr>
          <td>didUnmount</td>
          <td>This method is called after a component is removed from the DOM.</td>
        </tr>
      </tr>
      <tr>
        <td rowspan="5">Form-associated Custom Element related</td>
        <tr>
          <td>formAssociatedCallback</td>
          <td>Called when the browser associates the element with a form element or disassociates the element from a form element.</td>
        </tr>
        <tr>
          <td>formDisabledCallback</td>
          <td>Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed; or because the disabled state changed on a fieldset that's an ancestor of this element. The disabled parameter represents the new disabled state of the element. The element may disable elements in its shadow DOM when it is disabled.</td>
        </tr>
        <tr>
          <td>formResetCallback</td>
          <td>Called after the form is reset. The element should reset itself to some kind of default state. For input elements, this usually involves setting the value property to match the value attribute set in markup (or, in the case of a checkbox, setting the checked property to match the checked attribute).</td>
        </tr>
        <tr>
          <td>formStateRestoreCallback</td>
          <td>Called in one of two circumstances: when the browser restores the state of the element (for example, after a navigation, or when the browser restarts) or when the browser's input-assist features such as form autofilling sets a value. The type of the first argument depends on how the setFormValue() method was called.</td>
        </tr>
      </tr>
    </tr>
    <tr>
      <td>events</td>
      <td colspan="3">Allows you to define an <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">event</a> to its parent and trigger it easily. It will be defined using lowercase. For example, countChanged will be registered as countchanged.</td>
    </tr>
    <tr>
      <td>shadow</td>
      <td colspan="3">Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only <a href="https://dom.spec.whatwg.org/#dom-element-attachshadow">these elements</a> are allowed to use Shadow DOM.</td>
    </tr>
    <tr>
      <td>formAssociated</td>
      <td colspan="3">This tells the browser to treat the element like a <a href="https://web.dev/more-capable-form-controls/">form control</a>.</td>
    </tr>
    <tr>
      <td rowspan="3">extends</td>
      <td rowspan="3">Allows creating a <a href ="https://developers.google.com/web/fundamentals/web-components/customelements#extendhtml">Customized built-in element</a>.</td>
      <tr>
        <td>tag</td>
        <td colspan="3">The tag to extend.</td>
      </tr>
      <tr>
        <td>class</td>
        <td colspan="3">The class you want to extend.</td>
      </tr>
    </tr>
  </tbody>
</table>

If the extends field is not provided an [Autonomous custom element](https://developers.google.com/web/fundamentals/web-components/customelements#shadowdom) will be created.

### Component Lifecycle

```mermaid
stateDiagram-v2
    [*] --> willConstruct
    willConstruct --> didConstruct
    didConstruct --> connected
    connected --> willMount: Only the first time
    willMount --> didMount
    didMount --> disconnected
    disconnected --> didUnmount
    didUnmount --> [*]
    disconnected --> connected: If element was moved
    connected --> disconnected
    didUnmount --> connected: If the element was cached

    willConstruct --> formAssociated: Only if formAssociated
    formAssociated --> didConstruct
```

Callbacks can be called at almost any point of the lifecycle

## How This Works?
### The problem with stores - the traditional approach
Libraries traditional approach is usually based on stores.

```mermaid
graph TD;
    subgraph Store
    A["Property A"]
    B["Property B"]
    C["Property C"]
    end
    Store --> D["Component D"];
    Store --> E["Component E"];
    Store --> F["Component F"];
    F --> H["Component H"];
    F --> I["Component I"];
    Store --> G["Component G"];
```

This approach brings three major issues:
- Any update on the store will trigger an update on a component, even if the property that changed in the store has no relation to the component. Every tag, attribute, etc., will need to be checked for changes in every re-render.
- Any update on a component will trigger an update on the children, which might be unnecessary.
- There is no way to set static properties in a dynamic environment. Take this React example:
```tsx
const [value, setValue] = useState(0);
<input type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
```
In this example, the value is updated every time the input changes, which, by definition, is incorrect. Why? Because "value" *"Specifies the default value"*. This means that the value does not need to be updated after the first render since it has no effect. *"But React says that you can use defaultValue!"* Yes, but it's not the standard way to do it and it's one of the most common mistakes most React developers make. All this is due to not using the platform.

With Michijs the solution is:
```tsx
const value = useObserve(0);

<input type="number" value={value()} onchange={(e) => value(e.target.value)}/>
```

### Observers / Signals
 Observers are a behavioral design pattern that defines a one-to-many dependency between objects. When the observable / subject undergoes a change in state, all its dependents (observers / subscribers) are notified and updated automatically with a signal.

```mermaid
sequenceDiagram
    box rgb(71,73,73) Observable
    participant Value
    participant Proxy
    end
    Subscriber->>Proxy: Subscribes to
    Environment->>Proxy: Request to change a value
    Proxy-->>Value: Value is different?
    Value-->>Value: Yes! Update
    Value-->>Proxy: Sends a clone of the value
    Proxy->>Subscriber: Notifies with a signal (new value)
```

This approach allows for much more granular updates. Instead of updating an entire component, you can update HTML elements, attributes, or a simple text node and still maintain the principle of a single source of truth.

```mermaid
graph TD;
    subgraph Observable
    A["Property A"]
    B["Property B"]
    C["Property C"]
    end
    A --> D["Attribute D"];
    A --> E["Text node E"];
    B --> F["Another observable F"];
    C --> G["Text node G"];
```
When a node is garbage collected, it will be unsubscribed in the next update.

### Rendering - Static vs Dynamic
Taking the above into account, the rendering process changes drastically. Instead of rendering the entire component with each change, **we render the component only once, and the changes are managed through the observables**.

<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { createCustomElement, useComputedObserve } from "@michijs/michijs";

createCustomElement("test-component", {
  reflectedAttributes: {
    valueA: 0,
    valueB: 1,
  },
  methods: {
    incrementValueB() {
      this.valueB(this.valueB() + 1);
    },
  },
  render() {
    const sum = useComputedObserve(() => this.valueA() + this.valueB(), [this.valueA, this.valueB]);
    return (
      <>
        <button onpointerup={this.incrementValueB}>Increment B</button>
        {/* Renders 0, but is static */}
        <span>{this.valueA()}</span>
        {/* Renders 1, but is dynamic and will change when clicking on the button */}
        <span>{this.valueB}</span>
        {/* Renders 1, but is static */}
        <span>{this.valueA() + this.valueB()}</span>
        {/* Renders 1, but is dynamic and will change when clicking on the button */}
        <span>{sum}</span>
      </>
    );
  },
});
```

</details>

### Operators
Since all observables are objects, operators work in a different way.
We support most operators without explicitly calling the getter of the observable.

```tsx
  const a = useObserve(0);
  // Valid Javascript - Not valid Typescript
  const b = a + 1;
```
This is valid Javascript but is [not valid in Typescript yet](https://github.com/microsoft/TypeScript/issues/43826).

```tsx
  const a = useObserve("Hello");
  // Valid
  const b = a + " World";
```

We do not support boolean operators since proxies are objects:
```tsx
  const a = useObserve(false);
  // Valid - Returns 2
  const b = a() ? 1: 2;
  // Valid but wrong usage - Returns 1 since "a" is an object and evaluates "true"
  const b = a ? 1: 2;
```

## Hooks
There are several differences between our hooks and traditional ones:
- Can be used in various contexts, including top-level script code, functional components, and custom hooks. This flexibility allows developers to encapsulate logic and state management using hooks in different parts of their application.
- Most of them return observables.

The ability to use hooks outside of component code can be beneficial for managing application-wide state, setting up global side effects, or encapsulating reusable logic in utility functions or modules.  
It provides more flexibility in organizing code and separates concerns by allowing developers to centralize state management and side effects in hooks that can be reused across components or accessed from different parts of the application.

### Basic hooks
#### useObserve
Responsible for observing changes on different types of values. Takes two arguments:
- **item**: The value to be observed.
- **initialObservers**: An array of initial observers of type `Subscription<T>`.

This is the most basic hook and it is the basis of the entire component structure.

If the item contains a function, it will return an observable that observes for changes in the object itself. 

**A function in an observable should never mutate the observable.**

#### usePureFunction
It is used to create a memoized function that encapsulates the result of the provided callback function and updates it only when any of the dependencies change. Takes two arguments:
- **callback**: A function that returns a value of type T.
- **deps**: An array of dependencies that the callback function depends on.

<details>
  <summary><b>Example:</b></summary>

```tsx
import { usePureFunction } from "@michijs/michijs";

const sum = usePureFunction((a, b) => a + b, [a, b]);

console.log(sum(1, 2)); // Outputs 3
console.log(sum(1, 2)); // Outputs 3 - without calling the callback - returning the cached value
```

</details>

#### useAsyncComputedObserve
It is used for computing a value and observing its changes. Takes four arguments:
- **callback**: A function that returns a promise of type T.
- **initialValue**: Initial value of type T.
- **deps**: Dependencies to watch for changes.
- **options**: Optional object that may contain `onBeforeUpdate` and `onAfterUpdate` callback functions.

<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useAsyncComputedObserve } from "@michijs/michijs";

const fetchData = useAsyncComputedObserve(
  async () => {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  },
  [], // Initial value
  {
    onBeforeUpdate: () => console.log("Fetching data..."),
    onAfterUpdate: () => console.log("Data fetched:", fetchData()),
  }
);
```

</details>

#### useComputedObserve
It is used for computing a value and observing its changes. Takes three arguments:
- **callback**: A function that returns a value of type T.
- **deps**: Dependencies to watch for changes.
- **options**: Optional object that may contain `onBeforeUpdate` and `onAfterUpdate` callback functions.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useComputedObserve } from "@michijs/michijs";

const a = useObserve(2);
const b = useObserve(3);

const sum = useComputedObserve(() => a() + b(), [a, b], {
  onBeforeUpdate: () => console.log("Calculating sum..."),
  onAfterUpdate: () => console.log("New sum:", sum()),
});

console.log(sum()); // Outputs the computed sum
```

</details>

#### useStringTemplate
It is used to create a string template by interpolating dynamic values.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
  const a = useObserve(3);
  // Returns an observable with initial value 'Test 3' and subscribed to a
  const b = useStringTemplate`Test ${a}`;
```

</details>

#### useWatch
A simple mechanism for watching dependencies and invoking a callback when any of them change. Takes two parameters:
- **callback**: A function that returns a value of type T. This is the function that will be invoked when any dependency changes.
- **deps**: Optional array of dependencies to watch for changes.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useObserve, useWatch } from "@michijs/michijs";

const count = useObserve(0);

useWatch(() => {
  console.log(`Count has changed to: ${count()}`);
}, [count]);

// Simulating a change
count(1); // Outputs: Count has changed to: 1
```

</details>

#### useFetch
Fetches data from a URL, parses the response as JSON, and allows managing the result as an observable. Takes three parameters:
- **callback**: A function that returns the request options.
- **shouldWait**: An optional array of promises that should resolve before executing the fetch.
- **options**: Additional options for the fetch operation.

Returns: An object of type `FetchResult<R>`, which includes:
- **promise**: An observable representing the fetch promise.
- **recall()**: A method to call the promise again, available after the first call.


<details>
  <summary><b>Example:</b></summary>

```tsx
import { useFetch } from "@michijs/michijs";

const { promise, recall } = useFetch(async () => {
  const token = tokenCookie.token();
  const input = "/some/endpoint";
  const searchParams = { query: "example" };
  
  return {
    input: `https://api.github.com${input}`,
    searchParams,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `${token!.type} ${token!.value}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };
}, [validationProps, ...(shouldWait ?? [])], {});

// Example usage of the promise
promise().then(data => {
  console.log(data); // Outputs the fetched data
}).catch(error => {
  console.error(error);
});

// To call the promise again
recall();
```

</details>

#### usePromise
Uses a promise and allows managing the result as an observable. Takes two parameters:
- **callback**: The operation that returns a promise.
- **shouldWait**: An optional array of promises that should resolve before executing the promise.

Returns: A `PromiseResult` object, which includes:
- **promise**: An observable representing the promise.
- **recall()**: A method to call the promise again, available after the first call.

<!-- > [!TIP] -->
> You can also use `doPromise` for an imperative alternative.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { usePromise } from "@michijs/michijs";

const { promise, recall } = usePromise(async () => {
  const response = await fetch("https://api.github.com/users/octocat");
  return response.json();
}, []);

promise().then(user => {
  console.log(user); // Outputs the user data
});

// To recall the promise later
recall();
```

</details>

### Route management hooks
#### useHash
The `useHash` hook manages the hash portion of the URL, allowing you to observe and synchronize changes between the hash value and an observable state. This is particularly useful for single-page applications (SPAs) where routing is handled client-side. Parameters:
  
Returns: An observable with keys of type `T` and boolean values. 


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useHash } from "@michijs/michijs";

// Using useHash to manage the hash state
const hashState = useHash<'#drawerOpened'>();

// Opening a drawer
hashState['#drawerOpened'](true);
```

</details>

#### useSearchParams
Facilitates the management and observation of search parameters in the URL, providing a reactive way to handle changes and update the URL accordingly.

Returns: An observable object containing the search parameters defined by the generic type `T`.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useSearchParams } from "@michijs/michijs";

const searchParams = useSearchParams<{
    textParam: string;
}>();

// To update the search parameters
searchParams.textParam("Hello");
```

</details>

#### useTitle
Allows to observe the document title. Do not use document.title use this hook instead


<details>
  <summary><b>Example:</b></summary>
  
```tsx
import { useTitle } from "@michijs/michijs";

const title = useTitle();

title('test')
```

</details>

### Storage hooks
#### useStorage
Allows for observing changes in an object and synchronizing it with the browser's storage (such as localStorage). Takes two parameters:
- **item**: The object to be observed and synchronized with storage.
- **storage**: (Optional) The storage object to be used, defaults to `localStorage`.

<!-- > [!TIP] -->
> If you want to use cookies we provide a class that acts like an storage called CookieStorage


<details>
  <summary><b>Example:</b></summary>
  
```tsx
const { lang } = useStorage({
  // Default value
  lang: navigator.language,
});
```

</details>

#### useIndexedDB
It sets up event listeners for changes in the IndexedDB database. It returns a Proxy object that intercepts property accesses and performs corresponding IndexedDB operations. IndexedDB operations are performed asynchronously and return Promises. Takes three arguments:
- **name**: Specifies the name of the IndexedDB database to be used or created.
- **objectsStore**: Is a generic type that describes the structure of the object stores. It's defined as an object where each key represents the name of a property in the stored objects, and the value represents the configuration options for that property.
- **version**: (Optional) specifies the version number of the IndexedDB database. If the database with the specified name already exists and its version is lower than the provided version, it will perform any necessary upgrades.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
const storedCount = useIndexedDB<{
  counter: {
    count: number;
    id: number;
  };
}>("counter", {
  counter: {
    keyPath: "id",
  },
});

const count = useAsyncComputedObserve(
  async () => {
    return (await storedCount.counter.get(1))?.count ?? 0;
  },
  (await storedCount.counter.get(1))?.count ?? 0,
  [storedCount],
);

function decrementCount() {
  storedCount.counter.put({ count: count() - 1, id: 1 });
}
function incrementCount() {
  storedCount.counter.put({ count: count() + 1, id: 1 });
}
```

</details>

### CSS hooks
To use css we provide functions to create Constructable Stylesheets.
__Our stylesheets can also subscribe to observables.__

#### useStyleSheet
Allows to create a Constructable Stylesheet with a CSSObject.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
export const counterStyle = useStyleSheet({
  ':host': {
    display: 'flex',
    flexDirection: 'row'
  },
  span: {
    minWidth: '60px',
    textAlign: 'center'
  }
});
```

</details>

#### css
Allows to create a Constructable Stylesheet with a Template String.
[Recomended extension for VSCode](https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js).


<details>
  <summary><b>Example:</b></summary>
  
```tsx
export const counterStyle = css`
  :host {
      display: flex;
      flex-direction: row;
  }

  span {
      min-width: 60px;
      text-align: center;
  }
`
```

</details>

#### useAnimation
Generates CSS keyframes and animation properties based on the provided keyframes and options.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
const hiddenState = {
  opacity: 0,
} satisfies CSSProperties;
const shownState = {
  opacity: 1,
} satisfies CSSProperties;

const [hideKeyframe, hideProperties] = useAnimation([shownState, hiddenState], {
  duration: '2s',
  fill: 'forwards'
});
const [showKeyframe, showProperties] = useAnimation([hiddenState, shownState], {
  duration: '1s',
  fill: 'forwards'
});

export const dialogStyle = useStyleSheet((tag) => ({
  ...showKeyframe,
  ...hideKeyframe,
  [tag]: {
    ...hideProperties,
    display: 'flex',
    flexDirection: 'row',
    '[open]': showProperties
  },
}));
```

</details>

#### useTransition
Hook to generate CSS transition properties based on the provided configuration.


<details>
  <summary><b>Example:</b></summary>
  
```tsx
const opacityTransition = useTransition({
  property: ["opacity"],
  duration: "1s",
});

export const dialogStyle = useStyleSheet((tag) => ({
  [tag]: {
    ...opacityTransition,
    display: 'flex',
    flexDirection: 'row',
    opacity: 0,
    '[open]': {
      opacity: 1
    }
  },
}));
```

</details>

#### CSS module scripts
We do not provide support for this functionality yet as ESBuild does not support it yet. You can read how it works [here](https://web.dev/css-module-scripts/)

## Components

### If
Conditional rendering component. This is the only way to do it dynamically.

### Title
Title component for dynamically updating the document's title.

### Redirect
Redirect component for navigating to a different URL or location.

### Host
Allows to set attributes and event listeners to the host element itself.

### Fragment
Creates a virtual node that wrapps elements

### ElementInternals
*(Only available if formAssociated is true)*

It allows to:
- Make the element accessible to the browser
- Access element internals 
- Validate and assign values to forms

### AsyncComponent
Asynchronously renders a component after the promise ends. In the meantime you can choose to show a load component or not show anything.

### Slot
Checks if the context element has a shadow root and renders either a standard <slot> or a MichiSlot custom element, passing along attributes and children.

When nodes are added, it checks if they have a slot attribute matching the slot's name or if no name is set, appending them to the MichiSlot and triggering a slotchange event. 

The main difference between the standard slot aned the MichiSlot is that the parent does not have a shadow DOM so **every** child appended to the parent is moved to the slot.

## Custom element methods
### child
Allows to get a child element from the host with the selector

### idGen
Create unique IDs with a discernible key

## Attributes vs Properties in jsx
Usually, if you want to get an HTML like this:
```html
<div class='test'></div>
```
In React / Stencil / etc you should write a jsx like this:
```tsx
() => <div className='test'></div>
```
And eventually code like this would be executed:
```tsx
const el = document.createElement('div');
el.className = 'test';
```
In MichiJS you have the freedom to use both attributes and properties and the result will be the same:
```tsx
// Using properties
() => <div _={{className: 'test'}}></div>
// Using attributes
() => <div class='test'></div>
```
And eventually code like this would be executed:
```tsx
const el = document.createElement('div');
// Using properties
el.className = 'test';
// Using attributes
el.setAttribute('class', 'test')
```
In this way the jsx syntax of MichiJS is more similar to HTML.

## Lists
There are 2 ways to create a list
### The static way - Using map
It's the way to create static lists from an array object. Since the result will be static, it will reflect the state of a variable when it is rendered. Useful for read-only lists.
```tsx
const arrayTest = [0, 1, 2];

arrayTest.map(item => <div>{item}</div>)
```
This will generate an element like:

```html
  <div>0</div>
  <div>1</div>
  <div>2</div>
```

### The dynamic way - Using List component
It is a component that avoids using dom diff algorithms to render dynamic lists. This allows it to have a performance close to vanilla js. Operations on the array trigger corresponding changes in the DOM elements, making it ideal for dynamic lists.
```tsx
const arrayTest = useObserve([0, 1, 2]);

<arrayTest.List 
  as="span"
  renderItem={item => <div>{item}</div>}
/>
```
This will generate an element like:

```html
<span>
  <div>0</div>
  <div>1</div>
  <div>2</div>
</span>
```

### Comparison
<table>
  <thead>
    <tr>
      <th></th>
      <th>Map</th>
      <th>List component</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Performance</td>
      <td colspan="2">Close to vanilla</td>
    </tr>
    <tr>
      <td>Container</td>
      <td colspan="2">Virtual fragment or any other element</td>
    </tr>
    <tr>
      <td>Data</td>
      <td>Static</td>
      <td>Dynamic</td>
    </tr>
    <tr>
      <td>Updates</td>
      <td>No</td>
      <td>Only when an operator is triggered on the list or its elements</td>
    </tr>
  </tbody>
</table>

## Routing
The custom routing tool avoids using strings to represent URLs and instead utilizes modern APIs like the `URL` object. It also allows separating route components, promoting cleaner code.

<details>
  <summary><b>Example:</b></summary>
  
```tsx
//Parent routes
export const [urls, Router] = registerRoutes({
  syncRoute: <div>Hello World</div>,
  //Redirect route
  '/': <Redirect to={url} />
});

//Child routes
export const [urlsChild, RouterChild] = registerRoutes({
  // Async route
  asyncChildRoute: (
    <AsyncComponent
      promise={async () => (await import('./AsyncChildExample')).AsyncChildExample}
      loadingComponent={<span>loading...</span>}
    />
  ),
  //The parent route
}, urls.syncRoute);

// Will generate this url: /sync-route/async-child-route?searchParam1=param+1&searchParam2=2#hash1
const generatedUrl = urlsChild.asyncChildRoute({ 
  searchParams: { 
    searchParam1: 'param 1', 
    searchParam2: 2
  }, 
  hash: '#hash1' 
})
```
Router and RouterChild are components representing the mount points for each registered route.

```tsx
const AsyncChildExample: FC = () => {
    const searchParams = useSearchParams<{
      searchParam1: string, 
      searchParam2: number
    }>();
    const hash = useHash<'#hash1'| '#hash2'>();
    return (
      <>
        {/* Will show the value of searchParam1 */}
        <div>{searchParams.searchParam1}</div>
        {/* Will show true if the hash is #hash1 */}
        <div>{hash['#hash1']}</div>
      </>
    );
}

export default AsyncChildExample
```

</details>

## I18n
Internationalization (i18n) is supported through observables. By default, the desired languages are inferred from the browser settings. If your code supports an exact match (e.g., "en-UK") or a general match (e.g., "en"), that language will be selected. Otherwise, it falls back to the default language, which is the first one in the list. The default language cannot be obtained asynchronously.

<details>
  <summary><b>Example:</b></summary>
  
```tsx

const { lang } = useStorage({
  lang: navigator.language,
});

const translator = new I18n(["en-uk", "es"], lang);

const t = translator.createTranslation({
  "en-uk": {
    dogBit: "The dog bit its owner",
    birthDay: (date: Date) => `My birthday is ${date.toLocaleDateString('en-uk')}`,
  },
  es: () => import("./translations/es.json"),
});

export const MyComponent = createCustomElement('my-component', {
  render() {
    return (
      <>
        <p>{t.dogBit}</p>
        <p>{t.birthDay(new Date(1997, 20, 2))}</p>
      </>
    );
  }
});
```

</details>

## Limitations
### Observable objects
Because some objects are not proxy compatible we limit the observable objects to:
- Arrays
- Dates
- Maps
- Sets
- Any object whose prototype is Object

However, we still support assignments to such complex objects in that case you will have to cast those ones with ObservableComplexObject.

```tsx
  const observable = useObserve({
    file: new File([''], 'test') as unknown as ObservableComplexObject<File>
  })
```

This is because Typescript doesnt provide any tool to know if a type is part of the global namespace.

## Polyfills
If you REALLY need polyfills i recommend you to read this topics:

- https://www.webcomponents.org/polyfills
- https://ungap.github.io

### Built-in elements in Safari
We provide partial support for Safari's built-in elements by emulating their behavior with a custom element, michi-generic-element. This is necessary to manage the element's lifecycle and support adoptedStyleSheets.

## Browser Support
- **Customized built-in elements**: [Chrome feature status](https://www.chromestatus.com/feature/4670146924773376)
- **Autonomous custom elements**: [Chrome feature status](https://www.chromestatus.com/feature/4696261944934400) | [WebComponents.org](https://www.webcomponents.org/)
- **Framework Compatibility**: [Custom Elements Everywhere](https://custom-elements-everywhere.com)
- **Element internals**: [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals)

## Supporting MichiJS
### Sponsors
Support us with a donation and help us continue our activities [here](https://www.paypal.com/paypalme/lsegurado2).
<!-- ### Contributors
TODO:
<a href="https://github.com/@lsegurado/ls-element/graphs/contributors">
  <img src="https://opencollective.com/ls-element/contributors.svg?width=890&amp;button=false" style="max-width:100%;">
</a> -->


<!-- ### Open Collective

Support us with a donation and help us continue our activities. [[Contribute](https://opencollective.com/ls-element)]

### Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor](https://opencollective.com/ls-element#sponsor)] -->

## License
 - [MIT](https://github.com/michijs/michijs/blob/master/LICENSE.md)

[open-in-vscode]: https://img.shields.io/static/v1?label=Open%20in&logo=Visual%20Studio%20Code&message=Visual%20Studio%20Code&logoColor=007ACC&color=007ACC
[open-in-vscode-url]: https://vscode.dev/github/michijs/michijs-template
<!-- [open-in-vscode-url]: vscode://github.remotehub/open?url=https://github.com/lsegurado/ls-element -->
[minzipped-size]: https://img.shields.io/bundlephobia/minzip/@michijs/michijs
[repo-size]: https://img.shields.io/github/repo-size/michijs/michijs
[npm-downloads]: https://img.shields.io/npm/dt/@michijs/michijs
[version]: https://img.shields.io/npm/v/@michijs/michijs
[github-license]: https://img.shields.io/github/license/michijs/michijs
[github-license-url]: https://github.com/michijs/michijs/blob/master/LICENSE.md
