<div align="center">
  <img width="500px" src="https://raw.githubusercontent.com/michijs/art/main/logo-with-background-strait.png">
  <p>A Vainilla Library for Web Components</p>

  [![Open in Visual Studio Code][open-in-vscode]][open-in-vscode-url] 
  ![npm][version] 
  [![license][github-license]][github-license-url] 
  ![npm][npm-downloads] 
  ![npm][repo-size]
  ![npm][minzipped-size]
  [![CodeQL](https://github.com/michijs/michijs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/michijs/michijs/actions/workflows/codeql-analysis.yml)
  [![Tests](https://github.com/michijs/michijs/actions/workflows/tests.yml/badge.svg)](https://github.com/michijs/michijs/actions/workflows/tests.yml)
  
</div>

## Why "MichiJS?"

|  | MichiJS  |  React  |  StencilJS  | SvelteJS | VanillaJS |
|--|--|--|--|--|--|
| Prefer real DOM over virtual DOM | ✅ | ❌ | ❌ | ✅ | ✅ |
| Prefer Javascript templates over compiled plain text | ✅ | ✅ | ✅ | ❌ | ✅ |
| Templates with [JSX](https://es.reactjs.org/docs/introducing-jsx.html) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Element internals](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) support | ✅ | ❌ | ❌ | ❌ | ✅ |
| Does not require extensions to be identified by the IDE | ✅ | ✅ | ✅ | ❌ | ✅ |
| [Differentiation between attributes and properties in jsx / templates](#attributes-vs-properties-in-jsx) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Standard Web Components | ✅ |  ⭕ | ✅ | ⭕ | ✅ |
| Observables / stores support | ✅ | ⭕ | ⭕ | ⭕ | ❌ |
| [Esbuild](https://esbuild.github.io/)  as default bundler | ✅ | ❌ | ❌ | ❌ |❌ |
| [TypeScript](https://www.typescriptlang.org) support | ✅ | ✅ | ✅ | ✅ | ⭕ |
| Reactive | ✅ | ✅ | ✅ | ✅ | ❌ |
| Styling / Constructable Stylesheets support | ✅ | ❌ | ✅ | ❌ | ✅ |
| Automatic component type generation | ✅ | ❌ | ✅ | ❌ | ❌ |
| Without polyfills | ✅ | ✅ | ❌ | ❌ | ✅ |
| Attributes / Native events support | ✅ | ❌ | ⭕ | ✅ | ✅ |
| Supports [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) | ✅ | ❌ | ✅ | ✅ | ✅ |
| Supports Custom Built-in elements | ✅ | ❌ | ❌ | ✅ | ✅ |
| Can be used with different frameworks right out of the box | ✅ | ❌ | ✅ | ⭕ | ✅ |
| ✅ = implemented
| ⭕ = partially implemented
| ❌ = not implemented

## Getting Started

You can use [this template](https://github.com/michijs/michijs-template) or you can see on [Code Sandbox](https://githubbox.com/michijs/michijs-storybook-template/tree/master).
  
## Creating components

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

Or if you are using jsx
```tsx
import Counter from '../Counter';

<Counter oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)} />
```
<!-- 
## How this works? 
When you update an item, the library looks for your changes and only updates the attributes / children / etc that really changed.

### But... Wait, DOM elements shouldn't be unique?
  
In this case I am going to quote Eric Bidelman, a Google engineer on [this topic](https://developers.google.com/web/fundamentals/web-components/shadowdom):
*For example, when you use a new HTML id/class, there's no telling if it will conflict with an existing name used by the page.*
That is to say that while it is inside the Shadow DOM you should not worry about if your ID is repeated with one outside the Shadow DOM.

### Why not use keys like React?
Searching with IDs is so much faster than searching by queryselector. You can look at [this topic](https://measurethat.net/Embed?id=99697) and [this another](http://vanilla-js.com)

### But... What if I don't want to use Shadow DOM?
You can use our id generator to create unique IDs for each element in your component with a discernible key. 
```tsx
render() {
    return (
        <>
            <style id={this.idGen('style')}>{style}</style>
            <button id={this.idGen('decrement-count')} onpointerup={this.decrementCount}>-<button>
        </>
    );
}
```
The result will be like this:

```html
<style id="093dc6b7-315d-43c1-86ef-fcd49130ea32"></style>
<button id="c8d61264-45ee-42ce-9f74-1d76402d1f48">-</button>
``` -->

## Component structure
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
      <td colspan="3">Allows to define attributes.</td>
    </tr>
    <tr>
      <td>reflectedAttributes</td>
      <td colspan="3">Allows to define <a href="https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr">reflected attributes</a> and follows the Kebab case. A reflected attribute cannot be initialized with a true value
      </td>
    </tr>
    <tr>
      <td>methods</td>
      <td colspan="3">Methods are functions that notify changes at the time of making the change.</td>
    </tr>
    <tr>
      <td>adoptedStyleSheets</td>
      <td colspan="3">Allows to use <a href="https://developers.google.com/web/updates/2019/02/constructable-stylesheets">Constructable Stylesheets.</a> Remember that you need to use Shadow DOM to be able to use Constructable Stylesheets. In case your component doesn't support this feature, it will return a style tag.</td>
    </tr>
    <tr>
      <td>cssVariables</td>
      <td colspan="3">Allows to define CSS variables.</td>
    </tr>
    <tr>
      <td>reflectedCssVariables</td>
      <td colspan="3">Allows to define reflected CSS variables and follows the Kebab case. A reflected CSS variable cannot be initialized with a true value</td>
    </tr>
    <tr>
      <td>computedStyleSheet</td>
      <td colspan="3">Allows you to define a Constructable Stylesheet that depend on the state of the component. When there is no shadow root the style will be reflected in the style attribute.</td>
    </tr>
    <tr>
      <td>render</td>
      <td colspan="3">Function that renders the component.</td>
    </tr>
    <tr>
      <td rowspan="14">lifecycle</td>
      <tr>
        <td rowspan="8">Custom Element related</td>
        <tr>
          <td>willConstruct</td>
          <td>This method is called at the start of constructor.</td>
        </tr>
        <tr>
          <td>didConstruct</td>
          <td>This method is called at the end of constructor.</td>
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
          <td>willReceiveAttribute</td>
          <td>This method is called before a component does anything with an attribute.</td>
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
          <td>Called when the browser associates the element with a form element, or disassociates the element from a form element.</td>
        </tr>
        <tr>
          <td>formDisabledCallback</td>
          <td>Called after the disabled state of the element changes, either because the disabled attribute of this element was added or removed; 
      or because the disabled state changed on a fieldset that's an ancestor of this element. The disabled parameter represents the new disabled state of the element. The element may, for example, disable elements in its shadow DOM when it is disabled.</td>
        </tr>
        <tr>
          <td>formResetCallback</td>
          <td>Called after the form is reset. The element should reset itself to some kind of default state. For input elements, this usually involves setting the value property to match the value attribute set in markup (or in the case of a checkbox, setting the checked property to match the checked attribute.</td>
        </tr>
        <tr>
          <td>formStateRestoreCallback</td>
          <td>
          Called in one of two circumstances:
            <ul>
              <li>
              When the browser restores the state of the element (for example,after a navigation, or when the browser restarts). The mode argument is "restore" in this case.
              </li>
              <li>
              When the browser's input-assist features such as form autofilling sets a value. The mode argument is "autocomplete" in this case.
              </li>
            </ul>
            The type of the first argument depends on how the setFormValue() method was called. 
          </td>
        </tr>
      </tr>
    </tr>
    <tr>
      <td>events</td>
      <td colspan="3">Allows you to define an <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">event</a> to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.</td>
    </tr>
    <tr>
      <td>shadow</td>
      <td colspan="3">Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only <a href="https://dom.spec.whatwg.org/#dom-element-attachshadow">this elements</a> are allowed to use Shadow DOM.</td>
    </tr>
    <tr>
      <td>formAssociated</td>
      <td colspan="3">This tells the browser to treat the element like a <a href="https://web.dev/more-capable-form-controls/">form control</a>.</td>
    </tr>
    <tr>
      <td rowspan="3">extends</td>
      <td rowspan="3">Allows to create a <a href ="https://developers.google.com/web/fundamentals/web-components/customelements#extendhtml">Customized built-in element</a></td>
      <tr>
        <td>tag</td>
        <td colspan="3">The tag to extend</td>
      </tr>
      <tr>
        <td>class</td>
        <td colspan="3">The class you want to extend</td>
      </tr>
    </tr>
  </tbody>
</table>

If the extends field is not provided an [Autonomous custom element](https://developers.google.com/web/fundamentals/web-components/customelements#shadowdom) will be created.


## How this works?
### The problem with stores
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
    Store --> G["Component G"];
```
This approach brings two major issues:
- Any update on the store will trigger an update on a component even if the property that changed store has no relation to the component. Every tag / attribute / etc will need to be checked for changes in every rerender.
- There is now way to set static properties in a dinamic environment. Take this React example:
```tsx
  const [value, setValue] = useState(0);
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
    Proxy-->>Value: Value is diferent?
    Value-->>Value: Yes! Update
    Value-->>Proxy: Sends a clone of the value
    Proxy->>Subscriber: Notifies with a signal (new value)
```

This approach allows for a much more granular update. Instead of updating an entire component, you can update html elements, attributes, or a simple text node and still maintain the principle of a single source of truth.

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

### Rendering - Static vs dynamic
Taking the above into account, the rendering process changes drastically. Instead of rendering the entire component with each change, __we render the component only once and the changes are managed through the observables__.

For example:

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
    const sum = useComputedObserve(() => this.valueA() + this.valueB(), [this.valueA, this.valueB])
    return (
      <>
        <button onpointerup={this.incrementValueB}>Increment B</button>
        {/* Renders 0, but is static */}
        <span>{this.valueA()}</span>
        {/* Renders 1, but is dinamic and will change when clicking on the button */}
        <span>{this.valueB}</span>
        {/* Renders 1, but is static */}
        <span>{this.valueA() + this.valueB()}</span>
        {/* Renders 1, but is dinamic and will change when clicking on the button */}
        <span>{sum}</span>
      </>
    );
  },
});
```

In this example there are four different cases:

1. Getting a clone of the value, without binding the observable to the element; In this case we only get a number, not an observable, so the result is static.
```tsx
        {/* Renders 0, but is static */}
        <span>{this.valueA()}</span>
```

2. Getting a clone of the value, binding the observable to the element; In this case we use an observable, so the result is dinamic.
```tsx
        {/* Renders 1, but is dinamic and will change when clicking on the button */}
        <span>{this.valueB}</span>
```

3. Getting a clone of the value, binding the observable to the element; In this case we use an observable, so the result is dinamic.
```tsx
        {/* Renders 1, but is static */}
        <span>{this.valueA() + this.valueB()}</span>
```


```tsx
        <span>{this.valueA}</span>
        {/* Renders 1 */}
        <span>{this.valueB}</span>
        {/* Renders 1, but is static */}
        <span>{this.valueA() + this.valueB()}</span>
        {/* Renders 1, but is dinamic and will change when clicking on the button */}
        <span>{sum}</span>
      </>
    );
  },
});
```

### Operators

## Hooks

### Basic hooks
#### useObserve

#### usePureFunction

#### useComputedObserve
#### useStringTemplate

### Route management hooks
#### useHash
#### useSearchParams

### Storage hooks
#### useIndexedDB
#### useStorage
### CSS hooks
To use css we provide functions to create Constructable Stylesheets.
__Our stylesheets can also subscribe to observables.__

#### useStyleSheet
Allows to create a Constructable Stylesheet with a CSSObject
```js
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
#### css
Allows to create a Constructable Stylesheet with a Template String.
[Recomended extension for VSCode](https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js).

```js
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

#### CSS module scripts
We do not provide support for this functionality yet as ESBuild does not support it yet. You can read how it works [here](https://web.dev/css-module-scripts/)

## Components

### If
Conditional rendering component. This is the only way to do it dynamically.

### List

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

### Link
Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the HistoryManager.push method.

## Custom element methods
### child
Allows to get a child element from the host with the selector

### idGen
Create unique IDs with a discernible key

## Attributes vs Properties in jsx
Usually, if you want to get an html like this:
```html
<div class='test'></div>
```
In React / Stencil / etc you should write a jsx like this:
```jsx
() => <div className='test'></div>
```
And eventually code like this would be executed:
```js
const el = document.createElement('div');
el.className = 'test';
```
In MichiJS you have the freedom to use both attributes and properties and the result will be the same:
```jsx
// Using properties
() => <div _={{className: 'test'}}></div>
// Using attributes
() => <div class='test'></div>
```
And eventually code like this would be executed:
```js
const el = document.createElement('div');
// Using properties
el.className = 'test';
// Using attributes
el.setAttribute('class', 'test')
```
In this way the jsx syntax of MichiJS is more similar to html.

## Lists
There are 2 ways to create a list
### The static way - Using map
It's the way to create static lists from an array object. Since the result will be static, it will reflect the state of a variable when it is rendered. Useful for read-only lists.
```jsx
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
It is a component that avoids using dom diff algorithms to render dynamic lists. This allows it to have a performance close to vanilla js. An operation on the data implies an operation on the associated elements. 
```jsx
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
The intention of using a custom routing tool is to avoid the use of strings to represent the urls and to use modern apis that allow the use of the URL object itself. It also allows to separate the components of the routes which allows a cleaner code.

```js
//Parent routes
export const [urls, Router] = registerRoutes({
  syncRoute: <div>Hello World</div>,
  //Redirect route
  '/': <Redirect to={url} />,
});

//Child routes
export const [urlsChild, RouterChild] = registerRoutes({
  // Async route
  asyncChildRoute: {
    searchParams: {
      searchParam1: String, 
      searchParam2: Number
    },
    hash: ['#hash1', '#hash2']
    /** The promise to wait */
    promise: async () => (await import('./AsyncChildExample')).AsyncChildExample,
    /**The title of the page */
    title: 'Async Page title'
    /**The component to display while the promise is loading */
    loadingComponent: <span>Loading...</span>
  },
  //The parent route
}, urls.syncRoute);

urlsChild.asyncChildRoute({ searchParams: { searchParam1: 'param 1', searchParam2: 2}, hash: '#hash1' })
// Will generate this url: /sync-route/async-child-route?searchParam1=param+1&searchParam2=2#hash1
```
Router and RouterChild are components that represent the mount points of each registered route.

```js
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

## I18n
It is supported by using a custom store
```js
const translator = new I18n<'es' | 'en'>(localStorage.getItem('lang'));

const store = translator.createTranslation({
  es: () => import('./translations/es.json'),
  en
});
const t = store.state.t;

export const MyComponent = createCustomElement('my-component', {
  subscribeTo: {
    store
  },
  render() {
    return (
      <span>{t.hello}</span>
    );
  }
});
```

## Limitations
### Observable objects
Because some objects are not proxy compatible we limit the observable objects to:
- Arrays
- Dates
- Maps
- Sets
- Any object whose prototype is Object

## Polyfills
If you REALLY need polyfills i recommend you to read this topics:

- https://www.webcomponents.org/polyfills
- https://ungap.github.io

## Browser Support

### Customized built-in elements
- https://www.chromestatus.com/feature/4670146924773376

### Autonomous custom elements
- https://www.chromestatus.com/feature/4696261944934400
- https://www.webcomponents.org/

### Compatibility with frameworks
- https://custom-elements-everywhere.com

### Element internals
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals

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