<div align="center">
  <img width="200px" src="https://raw.githubusercontent.com/lsegurado/ls-element-logo/master/logo-with-background.svg"></img>

  ### A Vainilla Library for Web Components

  [![Open in Visual Studio Code][open-in-vscode]][open-in-vscode-url] 
  ![npm][version] 
  [![license][github-license]][github-license-url] 
  ![npm][npm-downloads] 
  ![npm][repo-size]

</div>


## Why "LS-Element?"
|  | LS-Element  |  React  |  StencilJS  | VanillaJS |
|--|--|--|--|--|
| Avoids Virtual Dom | ✅ | ❌ | ❌ | ✅ |
| Templates with [JSX](https://es.reactjs.org/docs/introducing-jsx.html) | ✅ | ✅ | ✅ | ❌ |
| [Differentiation between attributes and properties in jsx](#attributes-vs-properties-in-jsx) | ✅ | ❌ | ❌ | ❌ |
| Standard Web Components | ✅ |  ⭕ | ✅ | ✅ |
| Observables / stores support | ✅ | ⭕ | ⭕ | ❌ |
| [Esbuild](https://esbuild.github.io/)  as default bundler | ✅ | ❌ | ❌ | ❌ |
| [TypeScript](https://www.typescriptlang.org) support | ✅ | ✅ | ✅ | ⭕ |
| Reactive | ✅ | ✅ | ✅ | ❌ |
| Styling / Constructable Stylesheets support | ✅ | ❌ | ✅ | ✅ |
| Automatic type generation | ✅ | ❌ | ✅ | ❌ |
| Without polyfills | ✅ | ✅ | ❌ | ✅ |
| Attributes / Native events support | ✅ | ❌ | ⭕ | ✅ |
| Supports [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) | ✅ | ❌ | ✅ | ✅ |
| Supports Custom Built-in elements | ✅ | ❌ | ❌ | ✅ |
| Can be used with different frameworks right out of the box | ✅ | ❌ | ✅ | ✅ |
| ✅ = implemented
⭕ = partially implemented
❌ = not implemented

## Getting Started

You can use [this template](https://github.com/lsegurado/ls-element-template) or you can see on [Code Sandbox](https://codesandbox.io/s/github/lsegurado/ls-element-template/tree/master/?file=/src/components/RootComponent/index.tsx).
  
## Creating components

LS-Element custom elements are plain objects.

New components can be created using the `jsx/tsx` extension, such as `MyCounter.tsx`.

```tsx
import { AdoptedStyle, createCustomElement, EventDispatcher, h } from "@lsegurado/ls-element";
import { counterStyle } from "./counterStyle";

export const MyCounter = createCustomElement('my-counter', {
  reflectedAttributes: {
    count: 0
  },
  methods: {
    decrementCount() { this.count-- },
    incrementCount() { this.count++ },
  },
  events: {
    countChanged: new EventDispatcher<number>()
  },
  observe: {
    count() {
      this.countChanged(this.count)
    }
  },
  render() {
    return (
      <>
        <AdoptedStyle id="style">{counterStyle}</AdoptedStyle>
        <button id="decrement-count" onpointerup={this.decrementCount}>-</button>
        <span id='count'>{this.count}</span>
        <button id="increment-count" onpointerup={this.incrementCount}>+</button>
      </>
    )
  }
})
```

Note: the `.tsx` extension is required, as this is the standard for TypeScript classes that use JSX.

To use this component, just use it like any other HTML element:

```tsx
import '../Counter';

<my-counter id="my-counter" oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)} />
```

Or if you are using jsx
```tsx
import Counter from '../Counter';

<Counter id="my-counter" oncountchanged={(ev) => console.log(`New count value: ${ev.detail}`)} />
```
  
Please note that all elements included in the components in this library require an ID to work properly. This allows avoiding the use of the virtual DOM.

## How this works? 
When you update an item, the library looks for your changes and only updates the attributes / children / etc that really changed (similar to how the virtual DOM works). By forcing the use of IDs it is easy to find changes and update them without replacing nodes in the DOM and without using the virtual DOM.

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
```

## Component structure
A component consists of the following properties:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th colspan="2">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>attributes</td>
      <td colspan="2">Allows to define attributes.</td>
    </tr>
    <tr>
      <td>reflectedAttributes</td>
      <td colspan="2">Allows to define <a href="https://developers.google.com/web/fundamentals/web-components/customelements#reflectattr">reflected attributes</a> and follows the Kebab case.</td>
    </tr>
    <tr>
      <td>transactions</td>
      <td colspan="2">Transactions are functions that notify changes at the end of the transaction.</td>
    </tr>
    <tr>
      <td>methods</td>
      <td colspan="2">Methods are functions that notify changes at the time of making the change.</td>
    </tr>
    <tr>
      <td>render</td>
      <td colspan="2">Function that renders the component.</td>
    </tr>
    <tr>
      <td>observe</td>
      <td colspan="2">Contains methods with a name of an attribute / reflected attribute / observable like. Those methods are executed when a change has been made to their corresponding property.</td>
    </tr>
    <tr>
      <td rowspan="7">lifecycle</td>
      <tr>
        <td>willMount</td>
        <td>This method is called right before a component mounts.</td>
      </tr>
      <tr>
        <td>didMount</td>
        <td>This method is called after the component has mounted.</td>
      </tr>
      <tr>
        <td>didUnmount</td>
        <td>This method is called after a component is removed from the DOM.</td>
      </tr>
      <tr>
        <td>willUpdate</td>
        <td>This method is called before re-rendering occurs.</td>
      </tr>
      <tr>
        <td>didUpdate</td>
        <td>This method is called after re-rendering occurs.</td>
      </tr>
      <tr>
        <td>willReceiveAttribute</td>
        <td>This method is called before a component does anything with an attribute.</td>
      </tr>
    </tr>
    <tr>
      <td>events</td>
      <td colspan="2">Allows you to define an <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events">event</a> to his parent and triggering it easily. It will be defined using Lower case. For example countChanged will be registered as countchanged.</td>
    </tr>
    <tr>
      <td>subscribeTo</td>
      <td colspan="2">Allows you to subscribe to an <a href="https://github.com/sindresorhus/type-fest/blob/main/source/observable-like.d.ts">observable like</a> (like a store). When the store emit an event, the custom element will be re-rendered.</td>
    </tr>
    <tr>
      <td>shadow</td>
      <td colspan="2">Allows you to add a Shadow DOM. By default, it uses open mode on Autonomous Custom elements and does not use Shadow DOM on Customized built-in elements. Only <a href="https://dom.spec.whatwg.org/#dom-element-attachshadow">this elements</a> are allowed to use Shadow DOM.</td>
    </tr>
  </tbody>
</table>

Also, you have to create an [Autonomous custom element](https://developers.google.com/web/fundamentals/web-components/customelements#shadowdom) with a tag or in case you want to create an [Customized built-in element](https://developers.google.com/web/fundamentals/web-components/customelements#extendhtml) you have to declare the tag, the class you want to extend and the tag to extend.

## LSStore structure
A store consists of the following properties:
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>state</td>
      <td>Allows to define the store state.</td>
    </tr>
    <tr>
      <td>transactions</td>
      <td>Transactions are functions that notify changes at the end of the transaction.</td>
    </tr>
  </tbody>
</table>

LSStores use proxies to listen for changes in their state, in addition, they are observable.
Each component has an LSStore to listen for changes in its state.


## CSS
To use css we provide functions to create Constructable Stylesheets.
### createStyleSheet
Allows to create a Constructable Stylesheet with a CSSObject
```js
export const counterStyle = createStyleSheet({
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
### css
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
```

### CSS module scripts
We do not provide support for this functionality yet as ESBuild does not support it yet. You can read how it works [here](https://web.dev/css-module-scripts/)
<!-- ```js
import sheet from './styles.css' assert { type: 'css' };
``` -->

## Components
### Constructable Stylesheets
If you are not familiar with Constructable Stylesheets please check [this link](https://developers.google.com/web/updates/2019/02/constructable-stylesheets).
To use Constructable Stylesheets simply import AdoptedStyle and use it like an style tag (see [example](https://github.com/lsegurado/ls-element#creating-components)). In case your browser doesn't support this feature, it will return a style tag.
Remember that you need to use Shadow DOM to be able to use Constructable Stylesheets. 

### Host
Allows to set attributes and event listeners to the host element itself.

### AsyncComponent
Create a component whose content will load after the promise ends. In the meantime you can choose to show a load component or not show anything.

### Link
Provides the ability to move around the web page without reloading the page. It uses the same attributes as an anchor tag but also allows the use of URL objects. Uses the goTo method.

## Custom element methods
### child
Allows to get a child element from the host with the id

### rerender
Forces the element to re-render

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
In LS-Element you have the freedom to use both attributes and properties and the result will be the same:
```jsx
// Using properties
() => <div _className='test'></div>
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
In this way the jsx syntax of LS-Element is more similar to html.

## Routing
The intention of using a custom routing tool is to avoid the use of strings to represent the urls and to use modern apis that allow the use of the URL object itself. It also allows to separate the components of the routes which allows a cleaner code.

**Note: This is still a work in progress and may change in the future.**
```js
const Redirect = () => {
  goTo(urls.syncRoute())
  // Will generate and go to this url: /sync-route
  return <></>
}

//Parent routes
export const { urls, Router, components } = registerRoutes({
  syncRoute: createRoute({
    /**The component to display */
    component: <div id="test3">Hello World</div>,
    title: 'Sync title'
  }),
  //Redirect route
  '/': createRoute({
    component: <Redirect />
  }),
});

//Child routes
export const { urls: urlsChild, Router: RouterChild } = registerRoutes({
  // Async route
  asyncChildRoute: createAsyncRoute<{ searchParam1: string, searchParam2: number }, '#hash1' | '#hash2'>()({
    /** The promise to wait */
    promise: () => import('./AsyncChildExample'),
    /** The component key (by default is default)*/
    key: 'AsyncChildExample',
    /**The title of the page */
    title: 'Async Page title'
    /**The component to display while the promise is loading */
    loadingComponent: <span>Loading...</span>
  }),
  //The parent route
}, urls.syncRoute);

urlsChild.childRoute({ searchParams: { searchParam1: 'param 1', searchParam2: 2}, hash: '#hash1' })
// Will generate this url: /sync-route/async-child-route?searchParam1=param+1&searchParam2=2#hash1
```
Router and RouterChild are components that represent the mount points of each registered route.

The "components" function is a utility to create asynchronous components that includes the search params and component hashes with the types that were defined when the route was registered
```js
export const AsyncChildExample = components.childRoute(({ searchParams, hash }) => {
  return (
    <>
      {/* Will show the value of searchParam1 */}
      <div id="example">{searchParams.searchParam1}</div>
      {/* Will show true if the hash is #hash1 */}
      <div id="example2">{hash['#hash1']}</div>
    </>
  );
});
```
## Performance optimizations
If you want to help the library to make some optimizations you can use the following attributes:
-  _dynamicAttributes: An array with the names of the attributes that can change. 
-  _staticChildren: It indicates that children never change. If you use static Children, there is no need to use _staticChildren or _dynamicAttributes on your children.

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

## Supporting LS Element
### Sponsors
Support us with a donation and help us continue our activities [here](https://www.paypal.com/paypalme/lsegurado).
### Contributors

<a href="https://github.com/@lsegurado/ls-element/graphs/contributors"><img src="https://opencollective.com/ls-element/contributors.svg?width=890&amp;button=false" style="max-width:100%;"></a>


<!-- ### Open Collective

Support us with a donation and help us continue our activities. [[Contribute](https://opencollective.com/ls-element)]

### Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor](https://opencollective.com/ls-element#sponsor)] -->

## License
 - [MIT](https://github.com/lsegurado/ls-element/blob/master/LICENSE.md)

[open-in-vscode]: https://open.vscode.dev/badges/open-in-vscode.svg
[open-in-vscode-url]: vscode://github.remotehub/open?url=https://github.com/lsegurado/ls-element
[repo-size]: https://img.shields.io/github/repo-size/lsegurado/ls-element
[npm-downloads]: https://img.shields.io/npm/dt/@lsegurado/ls-element
[version]: https://img.shields.io/npm/v/@lsegurado/ls-element
[github-license]: https://img.shields.io/github/license/lsegurado/ls-element
[github-license-url]: https://github.com/lsegurado/ls-element/blob/master/LICENSE.md
