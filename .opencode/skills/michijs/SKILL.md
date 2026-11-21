---
name: michijs
description: Build web applications and components with @michijs/michijs (v2.x) — a TypeScript Web Components framework with fine-grained reactive observables, JSX (real DOM, not virtual), constructable stylesheets, custom elements + built-in extensions, routing, i18n, storage and Node-side string rendering. Load this skill whenever the user asks to write, debug, scaffold, or explain code that uses @michijs/michijs (createCustomElement, useObserve/useComputedObserve/useWatch hooks, JSX with the `_` property channel, EventDispatcher, Host, If/List/AsyncComponent, createRouter/useParams/useSearchParams/useHash, useStyleSheet/useCssVariables, I18n, useStorage/useIndexedDB, useFetch, ElementInternals/formAssociated, reflectedAttributes, customElements tagged templates, computedStyleSheet) or any topic involving the michijs package, @michijs/dev-server (`michi-server`), or jsxImportSource "@michijs/michijs". Do not load for unrelated frameworks (React, Vue, Svelte, Solid, Lit, Stencil) unless the user is migrating to/from michijs.
---

# MichiJS Skill

A focused guide to writing correct, idiomatic code with **`@michijs/michijs`** — a Web Components framework where:

- **JSX renders to real DOM** (no virtual DOM). Components render **once**; reactivity is **per-property**.
- **Observables = signals.** `useObserve(0)` returns a callable: `count()` reads, `count(5)` writes, `count.subscribe(fn)` listens.
- **Custom elements are first-class.** `createCustomElement("my-tag", {...})` builds standards-compliant Web Components (autonomous **or** built-in extensions).
- **JSX has two channels:** plain props set HTML *attributes*; the `_` prop sets DOM *properties*.
- Hexagonal architecture under the hood; consumers only import from `@michijs/michijs`.

## When to use this skill

Load it for any code or question involving `@michijs/michijs`, including: creating custom elements, working with reactive observables/hooks, writing JSX with this library, configuring `tsconfig` for `jsxImportSource: "@michijs/michijs"`, routing, i18n, storage, ElementInternals, or the `michi-server` dev tool.

## Core mental model — read this first

1. **Components run once.** `render()` is invoked a single time per instance. Updates happen because *values are observables*, not because the component re-renders. Putting an `if` in `render()` evaluates **once**; for runtime conditionals use the `If` component.

2. **Observables are objects.** They are always *truthy*. Never write `obs ? a : b` — write `obs() ? a : b`, or better, `If(obs, a, b)` for reactivity.

3. **Static vs reactive interpolation in JSX:**
   - `{count}` (no parens) → reactive text node that updates on change.
   - `{count()}` (call it) → snapshot, never updates.
   - Same rule for attributes: `<div data-x={count}>` reactive vs `<div data-x={count()}>` static.

4. **Two observable modes:**
   - Default lightweight signal: `useObserve(0)` → `CallableReactiveValuePort<T>`.
   - Deep proxy: `useObserve({a:1}, true)` → mutate properties to trigger updates (`state.a = 2`). Required for arrays/maps/sets/dates/objects you want to mutate in place.

5. **Attributes vs properties (the `_` prop):**
   ```tsx
   <div class="x"/>                              // setAttribute("class", "x")
   <div _={{ className: "x" }}/>                 // el.className = "x" (property)
   <video _={{ srcObject: stream }}/>            // pass non-string DOM properties
   ```
   Pass observables inside `_` to bind directly to DOM properties.

6. **Reflected attributes are kebab-case in HTML/JSX, camelCase in JS:**
   ```ts
   reflectedAttributes: { myCount: 0 }
   ```
   ```html
   <my-el my-count="3"></my-el>
   ```
   ```tsx
   <MyEl my-count={3}/>
   this.myCount(this.myCount() + 1);
   ```
   Cannot be initialized with `true` (use `false` or other values).

7. **Custom event names are lowercased.** `events: { countChanged: new EventDispatcher<number>() }` dispatches as `countchanged`. JSX listener: `oncountchanged={(ev: CustomEvent<number>) => …}`.

## Setup (consumer projects)

`package.json` peerDependencies expected by the library:

```json
{
  "peerDependencies": {
    "@types/trusted-types": "^2.0.7",
    "csstype": "^3.1.3"
  }
}
```

`tsconfig.json` minimum:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@michijs/michijs",
    "types": ["@types/trusted-types"]
  }
}
```

Bootstrap (`index.tsx`):

```tsx
import { createCustomElement, Host } from "@michijs/michijs";
import { Router } from "./routes";

createCustomElement("app-root", {
  shadow: false,
  render() { return <Host><Router/></Host>; },
});
```

```html
<!-- index.html -->
<script src="/index.js" type="module"></script>
<app-root></app-root>
```

The official dev tool is `@michijs/dev-server` (CLI: `michi-server --start | --dist | --test-tsc`). It is **not** required at runtime; any bundler that supports the `jsxImportSource` option works.

## Quick patterns

### A reactive counter (autonomous element)

```tsx
import { createCustomElement, EventDispatcher } from "@michijs/michijs";

export const SimpleCounter = createCustomElement("simple-counter", {
  reflectedAttributes: { count: 0 },
  events: { countChanged: new EventDispatcher<number>() },
  methods: {
    increment() { this.count(this.count() + 1); },
    decrement() { this.count(this.count() - 1); },
  },
  render() {
    this.count.subscribe(this.countChanged);   // emit event on every change
    return (
      <>
        <button onpointerup={this.decrement}>-</button>
        <span>{this.count}</span>
        <button onpointerup={this.increment}>+</button>
      </>
    );
  },
});
```

Usage from anywhere (HTML or JSX):

```tsx
<SimpleCounter count={3} oncountchanged={ev => console.log(ev.detail)} />
```

### Reactive computed + auto-tracking

```tsx
const a = useObserve(2), b = useObserve(3);
const sum = useComputedObserve(() => a() + b());          // deps auto-tracked
const labeled = useComputedObserve(() => `${a()}+${b()}`, [a, b]); // explicit deps
```

### Conditional and list rendering (do NOT use raw `if`/`map` for reactive data)

```tsx
import { If, List, useObserve } from "@michijs/michijs";

const open = useObserve(false);
<If condition={open}>{<dialog open>hi</dialog>}</If>;     // see references for full If signature

const items = useObserve([1,2,3], true);                  // proxied array
<List data={items} as="ul" renderItem={i => <li>{i}</li>} />;
items.push(4);                                            // updates DOM in place
```

### Async-loaded component (code splitting)

```tsx
<AsyncComponent
  promise={() => import("./HeavyPage")}
  loadingComponent={<span>loading…</span>}
/>
```

### Functional components

```tsx
import type { FC, FCC } from "@michijs/michijs";

const Hello: FC<{ name: string }> = (attrs) => <p>Hello {attrs.name}</p>;
const Card:  FCC<{ title: string }> = (attrs) => (
  <section><h2>{attrs.title}</h2>{attrs.children}</section>
);
```

`FC` props are auto-wrapped as observables — pass an observable and it stays reactive inside the component.

## What NOT to do

- ❌ `count + 1` inside JSX expecting reactivity in TS — works at runtime via valueOf but isn't typed; use `count.compute(v => v + 1)` or `useComputedObserve(() => count() + 1)`.
- ❌ `instanceof ProxiedValue` — duck-type with `isProxiedValue(x)` (checks `$value`).
- ❌ Mutating an observable from inside a function stored on that same observable.
- ❌ Initializing a reflected attribute with `true` (use `false`, a number, a string, or omit).
- ❌ Attaching a shadow root to a built-in extension that doesn't allow it (most don't). For `extends:` elements, `shadow` defaults to `false`.
- ❌ Calling observables (`count()`) when you wanted reactivity in JSX — that snapshots the value.
- ❌ `{cond && <X/>}` with a boolean `cond` (renders "false") — use `cond ? <X/> : undefined`.
- ❌ Expecting `List` to update with a non-proxied array — use `useObserve(arr, true)` / `{ useProxied: true }`.
- ❌ Hand-written `transition` strings — use `useTransition` (adds allow-discrete and reduced-motion handling).
- ❌ The `css` template — prefer `useStyleSheet` objects; descendant keys need a leading space (`" .x"`), and avoid comma lists in nested keys.
- ❌ Using `instanceof` for HTML built-in extensions on Safari without the polyfill caveat (partial support).

## Reference files (load on demand)

- `references/field-notes.md` — **Read first.** Rules learned in real projects: proxied vs plain observables and `List`, `renderSync` for non-proxyable data, `debounce`, `useStorage`/`useIndexedDB` details, JSX attribute/`style` caveats, syncing form-control values, `shadow: false`, `cssVariables`, nested-selector and comma-list quirks of `useStyleSheet`, `useTransition` (allow-discrete), `@starting-style`.

These contain full type signatures and longer examples. Read them with the Read tool when the task needs detail beyond the quick patterns above.

- `references/api.md` — Complete public API surface, grouped by category, with file:line citations.
- `references/custom-elements.md` — `createCustomElement` full options shape, `this` typing, lifecycle order, `formAssociated` + `ElementInternals`, built-in extensions, `customElement` tagged-template form, `Host` component.
- `references/hooks.md` — Every hook (`useObserve`, `useComputedObserve`, `useAsyncComputedObserve`, `useWatch`, `usePromise`, `usePureFunction`, `useStringTemplate`) with signatures, examples, and gotchas.
- `references/jsx.md` — JSX runtime details, the `_` property channel, observable interpolation rules, and full prop docs for `If`, `List`, `AsyncComponent`, `Host`, `Slot`, `Fragment`, `Redirect`, `Title`.
- `references/routing.md` — `createRouter`, `useHash`, `useSearchParams`, `useParams`, `useTitle`, nested routers, typed dynamic params.
- `references/styles.md` — `useStyleSheet` (object & callback forms), `useCssVariables`, `useAnimation`, `useTransition`, `css` template literal, `computedStyleSheet`, `CSSObject` syntax (nested selectors, `:host`, `@media`, `@keyframes`).
- `references/i18n-storage-network.md` — `I18n` class, `useStorage` (+`CookieStorage`), `useIndexedDB`, `doFetch`/`doGenericFetch`/`useFetch`.
- `references/pitfalls.md` — Comprehensive list of caveats and gotchas (boolean coercion, kebab-case rules, event lowercasing, `useProxied` defaults, shadow DOM defaults, Safari built-ins, `adoptedStyleSheets` without shadow DOM, complex objects like File).

## Verification checklist before finishing a task

When you write or modify MichiJS code, double-check:

1. Reactive interpolation: did you use `{obs}` (not `{obs()}`) where the UI must update?
2. Conditionals over observables: are they wrapped in `If(...)` or `obs.compute(...)`?
3. Reflected attribute names: kebab-case in HTML/JSX, camelCase in JS?
4. Custom event listeners: lowercased name with `on` prefix (`oncountchanged`)?
5. Tag name contains a hyphen (`${string}-${string}`)?
6. `tsconfig` has `"jsx": "react-jsx"` + `"jsxImportSource": "@michijs/michijs"`?
7. For mutating arrays/objects/maps/sets/dates: did you pass `true` as second arg to `useObserve`?
8. For built-in element extension: `shadow: false` is implicit; styles use a generated class instead of `:host`.
9. Did you avoid `instanceof ProxiedValue`? Use `isProxiedValue` instead.
