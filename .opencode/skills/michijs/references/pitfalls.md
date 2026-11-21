# Pitfalls & Gotchas

A complete list of the non-obvious behaviors. Skim before debugging.

## Reactivity

1. **Observables are objects → always truthy.** `obs ? a : b` is always `a`. Use `obs() ? a : b` for snapshots, or `If(obs, a, b)` / `obs.compute(v => v ? a : b)` for reactive conditionals.

2. **Calling an observable snapshots it.** `{count()}` in JSX produces a static text node. `{count}` produces a reactive one. Same rule for attributes.

3. **`render()` runs once per instance.** A plain `if`/`for` inside `render()` evaluates a single time. Use `If`, `List`, `AsyncComponent`, or observable-driven attributes for runtime updates.

4. **Auto-tracking caveat (async).** `useAsyncComputedObserve` only tracks observables read **synchronously** before the first `await`. Anything read after `await` won't subscribe.

5. **`useWatch` does not fire on registration.** It only fires on subsequent dep changes. If you need an immediate run, call the callback yourself.

6. **Function-on-observable rule.** A function stored in an observable should never mutate that same observable from inside itself.

7. **Arithmetic on observables.** `obs + 1` works at runtime via `valueOf`/`toString` but is not type-safe. Prefer `obs.compute(v => v + 1)` or `useComputedObserve(() => obs() + 1)`.

8. **`useProxied` defaults differ by API:** `useObserve` defaults to lightweight; `useStorage` always uses deep-proxy internally; `I18n.createTranslation` explicitly uses `{useProxied:true}`.

9. **Type guards, not instanceof.** Use `isProxiedValue(x)` (duck-checks `$value`) and `isObservable(x)`. Never `instanceof ProxiedValue` — the entity is private and may be wrapped.

## Custom elements

10. **Tag must contain a hyphen** (`${string}-${string}`).

11. **Reflected attributes are kebab-case in HTML/JSX, camelCase in JS.** `reflectedAttributes: { myCount: 0 }` ↔ `<my-el my-count="3">`.

12. **Cannot initialize a reflected attribute with `true`.** Use `false`, a number, or a string.

13. **Custom event names are lowercased.** `events: { countChanged }` dispatches as `countchanged`; JSX listener is `oncountchanged`.

14. **Shadow DOM defaults:**
    - Autonomous element → `{ mode: "open" }`.
    - `extends:` (built-in) → `false` (most built-ins forbid Shadow DOM).
    - To opt out for an autonomous element, set `shadow: false`.

15. **`willMount` fires once per instance.** `connected`/`disconnected` fire on every (re)attach. `didUnmount` only fires when the element is removed from the document entirely.

16. **Multiple registrations are silently ignored.** `customElements.define` is wrapped in try/catch — first registration of a tag wins.

17. **`adoptedStyleSheets` without shadow DOM** still works: MichiJS scopes them with a generated `.michijs-N` class and rewrites `:host`. Shadow-boundary selectors won't behave identically.

18. **Safari built-in extensions.** Need the `michi-generic-element` polyfill; support is partial. For maximum portability, prefer autonomous elements + composition.

19. **`formAssociated`.** Set `formAssociated: true` to access `this.$michi.internals` (`ElementInternals`). Use the `<ElementInternals>` component to set ARIA / form values reactively.

20. **`Host` vs `<slot>`.** `<Host>` configures the host element from inside `render()`. `<slot>` (or `<Slot>` polyfill) projects light-DOM children.

## JSX

21. **Property channel (`_`) vs attribute channel.** `<div class="x"/>` does `setAttribute("class", "x")`. `<div _={{ className: "x" }}/>` does `el.className = "x"`. Use `_` for non-string DOM properties (`srcObject`, `valueAsNumber`, `textContent`, etc.) and to bind observables directly to properties.

22. **Style objects are reactive per property.** Each value can be its own observable.

23. **`Fragment` is `null`** — `<>` works, but you cannot `import { Fragment }` and use `Fragment === something`.

## Routing

24. **The last route in `createRouter` is the default fallback.**

25. **Dynamic route params are required & typed.** `urls["users/:id"]({ params: { id } })` — TS error if you forget.

26. **`useParams(pattern)` returns proxied strings.** Convert with `Number()` if needed; the value is always a string.

## Storage / IndexedDB

27. **`useStorage` is always deep-proxied** internally regardless of options — mutations on nested objects propagate to storage.

28. **`useIndexedDB` results are Promises.** Pair with `useAsyncComputedObserve` and pass the `db` proxy as a dep so re-reads happen on cross-tab notifications.

## Complex objects in observables

29. Only **Object/Array/Map/Set/Date** are deeply proxiable. For File/Blob/MediaStream/etc. cast as `ObservableComplexObject<File>` and treat them as opaque values (replace, don't mutate).

## Build / setup

30. **`tsconfig` must have `"jsx": "react-jsx"` and `"jsxImportSource": "@michijs/michijs"`.** Without this, JSX won't resolve to the MichiJS runtime.

31. **Peer deps required:** `@types/trusted-types`, `csstype`.

32. **`michi-server` is optional.** Any bundler that supports `jsxImportSource` works (esbuild, Vite, etc.).
