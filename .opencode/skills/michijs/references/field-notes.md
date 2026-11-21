# Field notes — learned while building apps with MichiJS 2.4.x

Practical rules found in real work. They take precedence over older parts of the other references.

## Hooks & observables

- `useObserve(value)` is **not** proxied by default; `useObserve(value, true)` is (needed for arrays/objects
  you mutate, and for `List` reactivity). `useComputedObserve(fn, { useProxied: true })` for a computed list.
- Proxied items arrive in `List`'s `renderItem` as observables (`item.name()`, `item.compute(...)`); with a
  non-proxied array they are plain values **and the list doesn't re-render** when it changes.
- Don't put objects that must not be proxied (FileSystemFileHandle, DOM nodes, class instances) in proxied
  observables: render such lists imperatively with `renderSync(jsx, container)` on `subscribe`.
- `useComputedObserve(fn)` auto-tracks; `useComputedObserve(fn, { deps: [...] })` for explicit deps
  (an array as 2nd argument is not the API).
- `debounce(fn, ms)` is exported: `source.subscribe(debounce(target, 150))`.
- `useStorage({ key: default })` stores each key under its **raw name** (JSON); reading falls back to the
  raw string if it isn't JSON (handy for old "1"/"0" values). Destructure: `const { language } = useStorage({...})`.
  It syncs across tabs (`storage` event).
- `useIndexedDB(name, { store: { keyPath: "id" } })` → `db.store.put/get/getAll/delete()` promises;
  `db.subscribe` fires on writes (also from other tabs via BroadcastChannel). Good for things localStorage can't hold
  (e.g. file handles).

## JSX

- JSX attributes for custom elements are kebab-case (`michi-value`, `supporting-text`). CamelCase props of
  reflected attributes may end up lowercased (`hourcycle`) with wrong values → prefer one-word attribute names.
- `style={observable}` must be an observable of a **style object** (`obs.compute((c) => ({ insetInlineStart: ... }))`);
  an observable string is applied as a JSON-ish value. For per-frame values, set `el.style` directly.
- JSX doesn't return DOM nodes: to get an element, `renderSync(<X/>, fragment)` and take `firstElementChild`.
- Comparisons in `If`/`.compute` must not render `false`: `{cond && <X/>}` prints "false" when cond is a boolean —
  use `cond ? <X/> : undefined`.
- A form control the user already changed ignores later changes of its `value`/`selected` **attributes**: keep the
  property in sync (`el.value = v` on subscribe) when values can change from outside (e.g. a "reset" button).

## createCustomElement

- `shadow: false` for autonomous elements that draw their own light-DOM content; otherwise they get a shadow root
  and their children aren't rendered.
- `cssVariables` (internal CSS vars) vs `reflectedCssVariables` (also an attribute).
- `methods` exist and are typed on `this`; listen for non-bubbling events (`toggle`) on children with
  `addEventListener(..., true)` (capture).
- To intercept `el.value = …` on a built-in extension, redefine the property on the instance with the
  prototype's descriptor (`Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")`).

## Styles (`useStyleSheet`)

- Prefer `useStyleSheet` objects over the `css` template.
- Nested keys: a descendant needs a leading space (`" .child"`); no space = compound (`"[open]"` → `&[open]`).
- Comma lists in a nested key are expanded wrongly (`"[a], [b]"` → `&[a], & [b]`): write separate keys or use `:is()`.
- `"@keyframes name": { from: {...} }` and `"@starting-style": { [selector]: {...} }` work as keys.
- `useTransition({ property, duration, timingFunction })` returns `willChange` + transitions inside
  `@media (prefers-reduced-motion: no-preference)` with `transition-behavior: allow-discrete` (so `display` and
  `overlay` can be transitioned for exit animations). Use it instead of hand-written `transition` strings.
- `useAnimation` keyframes defined in a component's shadow root don't apply to pseudo-elements like
  `::picker(select)`; use transitions + `@starting-style`.

## Tooling

- Dev server (`michi-server --start`) builds `.ts` files in `public/` as standalone bundles (handy for Web Workers:
  `new Worker("./worker.js", { type: "module" })`).
- In a worker that imports alphaTab, messages need a string `cmd` (alphaTab installs its own listener).
- Bundle isolated tests with esbuild `--jsx=automatic --jsx-import-source=@michijs/michijs` (bun's JSX transform
  breaks `Host`).
