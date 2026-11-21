# JSX Reference

Runtime: `src/infrastructure/dom/jsx-runtime/index.tsx`. `jsx`, `jsxs`, `jsxDEV` all return a description object that the ElementFactory turns into real DOM. `Fragment = null` (handled specially).

`tsconfig`:
```json
{ "jsx": "react-jsx", "jsxImportSource": "@michijs/michijs" }
```

## Static vs reactive

```tsx
{count}      // reactive text node
{count()}    // snapshot string

<div data-x={count}/>      // reactive attribute
<div data-x={count()}/>    // static attribute
```

## The `_` property channel

The reserved JSX prop `_` writes to DOM **properties**, not attributes. Each value can be an observable.

```ts
interface MichiAttributes<E> {
  children?: JSX.Element;
  _?: { [k in WritableKeys<E>]?: ObservablePort<E[k] | undefined | null> };
}
```

```tsx
<div  class="x"/>                          // setAttribute("class", "x")
<div  _={{ className: "x" }}/>             // el.className = "x"
<video _={{ srcObject: stream }}/>          // assign non-string DOM property
<input _={{ value: name, valueAsNumber: n }}/>
```

Use `_` whenever you need to:
1. Pass a non-string value (Stream, Blob, MediaSource…).
2. Bind an observable directly to a DOM property without going through the attribute string round-trip.
3. Set properties that have no equivalent attribute (`textContent`, `srcObject`, etc.).

## Event listeners

JSX props starting with `on` become `addEventListener` calls. Custom event names from `EventDispatcher` are lowercased:

```tsx
<my-counter oncountchanged={(ev: CustomEvent<number>) => console.log(ev.detail)} />
<button onpointerup={handler}/>
```

## Style objects

Object form; each property reactive independently:

```tsx
<div style={{ color: theme, fontSize: useStringTemplate`${size}px` }}/>
```

## Functional components

```ts
type FC<T = AnyObject> = (
  attrs: FCProps<T>,
  factory: ElementFactory,
) => JSX.Element;

type FCC<T = AnyObject> = FC<T & { children?: JSX.Element }>;
```

`FCProps<T>` wraps each prop in `ObservableOrConst<T[k]>` so the caller may pass a value or an observable; inside the FC you treat them as observables.

```tsx
const Greeting: FC<{ name: string }> = (attrs) =>
  <p>Hello {attrs.name}</p>;            // attrs.name is reactive when caller passes obs
```

## Built-in components

### `Fragment` / `<>`

```tsx
<>{a}{b}</>
```

### `Host`

Targets the host element of a custom element from inside its `render()`:

```tsx
render() {
  return (
    <Host onclick={this.toggle} class="card" data-state={this.state}>
      <slot/>
    </Host>
  );
}
```

### `Slot`

Use `<slot>` directly inside Shadow DOM. The `Slot` component is a polyfill that works whether shadow DOM is enabled or not.

### `If`

Conditional rendering driven by an observable.

```tsx
// Two-arm
If(condition, <A/>, <B/>);

// With wrapper attrs
If(condition, <A/>, <B/>, { as: "section", attrs: { class: "wrap" }, enableCache: true });

// Switch form
If(state, [["loading", <Spinner/>], ["ready", <Page/>]], <Error/>);

// CSS-var mode
If(cssVars.theme, [["dark", "#000"]], "#fff");
```

### `List`

Keyed list rendering for proxied arrays. Reorders/inserts/removes DOM nodes in place.

```tsx
const items = useObserve([1, 2, 3], true);     // ProxiedArray
<List data={items} as="ul" renderItem={item => <li>{item}</li>} />

// Or via the array's own .List method:
<items.List as="span" renderItem={item => <div>{item}</div>} />

// Static arrays — falls back to .map():
<List data={[1, 2, 3]} renderItem={item => <li>{item}</li>} />
```

`useTemplate?: boolean` — `cloneNode` optimization. Requires renderItem to return a single plain JSX element (no `If`/`List`/Fragment inside).

### `AsyncComponent`

```tsx
<AsyncComponent
  promise={() => import("./HeavyPage")}        // resolves default export
  loadingComponent={<span>loading…</span>}
  then={(mod) => mod.NamedExport}
  catch={(err) => <p>{String(err)}</p>}
  as="section"
/>
```

The `promise` may itself be an observable promise; reassigning it triggers a reload.

### `Redirect`

```tsx
<Redirect to={urls.home()} />
<Redirect to={() => urls["/users/:id"]({ params: { id: currentId() } })} />
```

### `Title`

```tsx
<Title>{titleString}</Title>      // sets document.title reactively
```

### `Router`

Returned by `createRouter`. See `references/routing.md`.

## Element factory internals (for understanding)

`src/infrastructure/dom/rendering/ElementFactory.ts:35-103` shows how each prop is processed:

- `children` → recursive create.
- `_` → bind each `_[name]` observable to `el[name] = newValue`.
- `style` (object) → bind each style property individually.
- `on*` → `addEventListener(name.slice(2), fn)`.
- Anything else → reactive `setAttribute` via `bindObservable`.
