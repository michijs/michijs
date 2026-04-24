# AGENTS.md — AI Coding Assistant Reference for @michijs/michijs

> **Version**: 2.4.0  
> **Package**: `@michijs/michijs`  
> **License**: MIT  
> **Runtime**: Browser (main), Node.js (SSR subset)  
> **Package manager**: Bun  
> **Build tool**: `@michijs/dev-server` (`michi-server`)

---

## Architecture

Hexagonal architecture. See [ARQUITECTURE.md](./ARQUITECTURE.md) for full diagram.

```
src/
├── domain/          # Core logic — zero infrastructure dependencies
│   ├── entities/    # Observable, ReactiveValue, ProxiedValue, IdGenerator, etc.
│   ├── ports/       # Interfaces/contracts (importable by any layer)
│   ├── use-cases/   # Hooks, I18n, proxy handlers
│   ├── utils/       # getObservables, bindObservable
│   └── typewards/   # isObservable
├── shared/          # Utilities, types, type guards — no domain/infra deps
│   ├── types/       # AnyObject, PrimitiveType, KebabCase, DeepReadonly, etc.
│   ├── typewards/   # hasToJSON, isProxiedValue
│   └── utils/       # unproxify, formatToKebabCase, clone/*, throttle, debounce, etc.
├── infrastructure/
│   ├── dom/         # Browser adapter: custom elements, JSX, rendering, styles, routing, storage, URL
│   ├── platform/    # DOM-agnostic JS APIs: fetch, EventDispatcher, constants
│   └── node/        # Node.js SSR adapter
├── index.ts         # Browser entry (re-exports domain + dom + shared + platform)
├── index.node.ts    # Node entry (re-exports domain only)
├── jsx-runtime.tsx  # JSX runtime re-export
└── jsx-dev-runtime.tsx
```

### TSConfig Path Aliases

| Alias | Resolves to |
|-------|-------------|
| `@ports` | `./domain/ports/index` |
| `@domain` | `./domain/index` |
| `@domain/*` | `./domain/*` |
| `@shared` | `./shared/index.ts` |
| `@shared/*` | `./shared/*` |

Base URL: `./src`

### Import Rules

| Layer | Can import from | CANNOT import from |
|-------|----------------|-------------------|
| `shared/` | `@ports` (type-only only) | `@domain` (values), infrastructure |
| `domain/` | `@shared`, `@ports`, relative within domain | infrastructure |
| `infrastructure/` | `@domain`, `@ports`, `@shared` | relative paths crossing layers |

Within the same layer, use **relative imports**. Cross-layer imports use **aliases**.

---

## Reactive System

### Two Observable Modes

The reactive system has two modes, controlled by the `useProxied` parameter:

1. **Lightweight (default)**: `CallableReactiveValuePort<T>` — similar to TC39 signals. Call it to update, subscribe to changes.
2. **Deep-proxy**: `ObservableProxyPort<T>` — intercepts property access/mutations on complex objects (arrays, maps, sets, dates, plain objects).

```ts
// Default — lightweight reactive value
const count = useObserve(0);           // CallableReactiveValuePort<number>
count(5);                               // update
count.subscribe(v => console.log(v));   // subscribe

// Deep-proxy mode
const state = useObserve({ a: 1 }, true);  // ObservableProxyPort<{a:number}>
state.a = 2;                                // triggers subscribers
```

### Key Types (from `@ports`)

| Type | Description |
|------|-------------|
| `ObservablePort<T>` | Base observable interface (has `subscribe`, `notify`) |
| `ReactiveValuePort<T>` | Lightweight reactive value |
| `CallableReactiveValuePort<T>` | Callable reactive value — `obs(newValue)` to update |
| `ObservableProxyPort<T>` | Deep-proxy observable (callable, dispatches to Date/Array/Map/Set/Object/Primitive variants) |
| `ProxiedValuePort<T>` | Port for the proxied value entity |
| `ProxyHandlerPort<T>` | Proxy handler interface |
| `ParentSubscription` | Parent subscription for nested proxied observables |
| `UnproxifyPort<T>` | Type utility to unwrap proxied types |
| `ObservableOrConst<T>` | `T | ObservableProxyPort<T> | CallableReactiveValuePort<T>` |
| `Subscription` | Subscription callback type |
| `TargetPort` | Target for observable notifications |

### Entities (from `@domain`)

| Entity | Description |
|--------|-------------|
| `Observable` | Base observable class |
| `ReactiveValue` | Lightweight reactive value class |
| `ProxiedValue` | Deep-proxy observable class |
| `ProxiedArray` | Proxied array with reactive mutations |
| `ReactiveArray` | Reactive array |
| `Callable` | Makes a class callable |
| `CallableObservable` | Callable observable |
| `ObservableWithValue` | Observable that stores a value |
| `ObservableFromEventListener` | Observable from DOM event listeners |
| `IdGenerator` | Sequential ID generator |
| `MappedIdGenerator` | Mapped ID generator (key-based) |
| `GarbageCollectableObject` | WeakRef-based garbage collection |

---

## Hooks

All hooks are in `domain/use-cases/hooks/`.

### `useObserve(item, useProxied?)`

Creates an observable for a value.

- `useProxied: false` (default) → `CallableReactiveValuePort<T>`
- `useProxied: true` → `ObservableProxyPort<T>`

### `useComputedObserve(callback, deps, options?)`

Computes a value and recomputes when `deps` change.

- When `deps` is omitted, dependencies are **automatically detected** by tracking observable reads during callback execution (auto-tracking). Dependencies are re-detected on each recomputation using a diff-based approach — only newly discovered deps are subscribed and only removed deps are unsubscribed, avoiding unnecessary work.
- `options.useProxied: true` → deep-proxy result
- `options.onBeforeUpdate` / `options.onAfterUpdate` — lifecycle callbacks

### `useAsyncComputedObserve(callback, initialValue, deps, options?)`

Async version of `useComputedObserve`. Callback receives an `AbortSignal` that aborts if a newer invocation starts.

- When `deps` is omitted, dependencies are **automatically detected** by tracking synchronous observable reads during callback invocation (before the first `await`). Uses the same diff-based subscription management as `useComputedObserve`.

### `useWatch(callback, deps)`

Subscribes `callback` to all observables in `deps`. Fires on any change.

### `usePromise(callback, shouldWait?)`

Wraps a promise with observable state. Returns `{ promise, recall() }`.
- `promise` is an observable holding the Promise
- `recall()` re-executes the callback
- `shouldWait` — array of promises/functions that must resolve first

### `usePureFunction(callback, deps)`

Memoized function. Returns a function that caches the result of `callback` and only recomputes when `deps` change.

### `useStringTemplate(templateStringsArray, ...props)`

Tagged template literal that returns a computed observable string. Props are observables interpolated into the template.

---

## Custom Elements

### `createCustomElement(tag, options?)`

Defines and registers a custom element. Returns a class (`MichiElementClass<O>`).

```ts
const MyComponent = createCustomElement("my-component", {
  attributes: { count: 0 },
  reflectedAttributes: { label: "default" },
  cssVariables: { color: "red" },
  reflectedCssVariables: { size: "16px" },
  events: { countChanged: new EventDispatcher<number>() },
  methods: { increment() { this.count(this.count.valueOf() + 1); } },
  adoptedStyleSheets: { main: myStyleSheet },
  computedStyleSheet(selector) { return { [selector]: { opacity: this.count } }; },
  shadow: { mode: "open" },       // default for autonomous elements
  formAssociated: false,
  extends: { tag: "button", class: HTMLButtonElement },  // built-in extension
  lifecycle: {
    willConstruct() {},
    didConstruct() {},
    connected() {},
    willMount() {},
    didMount() {},
    disconnected() {},
    didUnmount() {},
    willReceiveAttribute(name, newValue, oldValue) {},
    adopted(document, newDocument) {},
    formAssociated(form) {},
    formDisabled(disabled) {},
    formReset() {},
    formStateRestore(state, mode) {},
  },
  render() {
    return <div>{this.count}</div>;
  },
});
```

**Key points:**
- `tag` must be `${string}-${string}` (custom element spec)
- All attributes/reflectedAttributes become `ObservableProxyPort` properties on `this`
- Reflected attributes sync with HTML attributes (kebab-case)
- `this.child(selector)` queries shadow DOM or light DOM
- `this.idGen(key)` generates deterministic unique IDs
- `this.$michi.internals` — `ElementInternals` (when `formAssociated: true`)

### Lifecycle Order

1. `willConstruct` → 2. `didConstruct` → 3. `connected` → 4. `willMount` → 5. `render()` → 6. `didMount`
7. On disconnect: `disconnected` → `didUnmount` (if removed from document)
8. On attribute change: `willReceiveAttribute`
9. Form callbacks: `formAssociated`, `formDisabled`, `formReset`, `formStateRestore`

### Components

| Component | Description |
|-----------|-------------|
| `Host` | Represents the host element in shadow DOM |
| `Slot` | `<slot>` wrapper with typed props |
| `If` | Conditional rendering from observable |
| `List` | Keyed list rendering from observable array. Supports `useTemplate` for cloneNode optimization |
| `AsyncComponent` | Lazy-loaded component from dynamic import |
| `Fragment` | Groups children without extra DOM nodes |
| `Redirect` | Navigates to a URL on mount |
| `Title` | Sets document title reactively |
| `Router` | Route matching component |

### `EventDispatcher`

```ts
const myEvent = new EventDispatcher<number>();
// In component: this.myEvent(42) dispatches CustomEvent
```

---

## JSX

- JSX runtime: `src/infrastructure/dom/jsx-runtime/index.tsx`
- Exports: `jsx`, `jsxs`, `jsxDEV`, `Fragment`
- `tsconfig.json` should set `"jsx": "react-jsx"` and `"jsxImportSource": "@michijs/michijs"`
- Intrinsic elements are fully typed via generated HTML/SVG/MathML types
- The `_` prop allows binding observables to element properties

### Functional Components

```ts
const MyFC: FC<{ label: string }> = (attrs, factory) => {
  return <div>{attrs.label}</div>;
};

// With children
const MyFCC: FCC<{ label: string }> = (attrs) => {
  return <div>{attrs.label}{attrs.children}</div>;
};
```

`FC` props are automatically wrapped in `ObservableProxyPort` via `FCProps<T>`.

---

## Styles

### `useStyleSheet(cssObject, window?)`

Converts a `CSSObject` to a `CSSStyleSheet`. Supports nested selectors, media queries, `:host`, pseudo-elements, and observable values.

```ts
const sheet = useStyleSheet({
  ".my-class": {
    color: "red",
    "&:hover": { color: "blue" },
    "@media (max-width: 768px)": { fontSize: "14px" },
  },
});
```

### `useStyleSheet(callback, window?)` (overload)

Takes a callback `(selector, cssVariables) => CSSObject` for dynamic styles with CSS variables.

### `useCssVariables(cssObject)`

Returns a typed accessor object for CSS custom properties.

### `useAnimation(keyframes, options)`

Returns `[CSSObject, CSSObject]` — the `@keyframes` rule and the `animation` property.

### `useTransition(props)`

Returns a `CSSObject` with transition properties.

### `CSSObject` type

```ts
interface CSSObject {
  [key: string]: ObservableOrConst<CSSProperty>;
}
type CSSProperty = CSSObject | CSSProperties | string | number | undefined | null;
```

---

## Routing

### `createRouter(routes, parentRoute?)`

```ts
const [urls, Router] = createRouter({
  "/home": <HomePage />,
  "/about": <AboutPage />,
  "/users/:id": <UserPage />,
});

// urls.home() → URL object
// urls.home({ searchParams: { q: "test" }, hash: "#section" })
// urls["/users/:id"]({ params: { id: "42" } }) → URL with /users/42
// urls["/users/:id"]({ params: { id: "42" }, searchParams: { tab: "bio" } })
// <Router />
```

Returns `[urlFunctions, RouterComponent]`.

`UrlFunction` is fully typed: when a route key contains `:param` segments, the `params` argument is **required** with the exact param names. When the route has no dynamic segments, `params` is optional (useful for passing parent route params).

### URL Hooks

| Hook | Description |
|------|-------------|
| `useHash()` | Observable for URL hash. Set keys to `true`/`false` |
| `useSearchParams()` | Observable for URL search params |
| `useParams(pattern, parentRoute?)` | Observable for dynamic route params extracted from the current URL. Pattern uses `:param` syntax (e.g. `"/users/:id"`). Fully typed — `useParams("/users/:id")` returns `ObservableProxyPort<Record<"id", string>>` |
| `useTitle()` | Observable for `document.title` |

### `HistoryManager`

Singleton observable that wraps `history.pushState` / `history.replaceState`. Used internally by routing.

---

## I18n

### `I18n` class

```ts
const i18n = new I18n(["en", "es", "fr"], optionalLanguageObservable);

const t = i18n.createTranslation({
  en: { greeting: "Hello" },
  es: () => import("./es.json"),    // async loading
  fr: () => import("./fr.json"),
});

// t.greeting — reactive, updates when language changes
// i18n.currentLanguage — get/set current language
// i18n.defaultLanguage — first in supportedLanguages list
```

- Extends `ReactiveValue<K>` — language is itself an observable
- Auto-detects browser language via `navigator.languages`
- Matches exact ("en-US") then general ("en") then falls back to default
- `createTranslation` uses `useAsyncComputedObserve` with `{ useProxied: true }`

---

## Storage

### `useStorage(item, storage?)`

Syncs an observable object with browser storage (localStorage, sessionStorage, or CookieStorage).

```ts
const settings = useStorage({ theme: "dark", fontSize: 16 });
// settings.theme("light") — updates both observable and localStorage
```

- Always uses deep-proxy mode internally (`useObserveInternal`)
- Listens for cross-tab `storage` events
- Supports `CookieStorage` entity for cookie-based storage

### `useIndexedDB(name, objectStores, version?)`

Returns a proxy for IndexedDB operations with BroadcastChannel sync.

```ts
const db = useIndexedDB("mydb", { users: { keyPath: "id" } });
await db.users.add({ id: 1, name: "John" });
const user = await db.users.get(1);
// db.subscribe(storeName => ...) for change notifications
```

---

## Network

### `doFetch(input, init?)`

Typed fetch wrapper. Returns the response.

### `doGenericFetch(input, init?)`

Generic fetch with typed response parsing.

### `useFetch(callback, shouldWait?)`

Combines `usePromise` with fetch. Returns `{ promise, recall() }`.

---

## Shared Utilities

From `@shared`:

| Utility | Description |
|---------|-------------|
| `unproxify(value)` | Unwraps proxied observables to plain values |
| `formatToKebabCase(str)` | Converts camelCase to kebab-case |
| `getFormData(form)` | Extracts form data from a form element |
| `getCSSStyleSheetText(sheet)` | Gets text content of a CSSStyleSheet |
| `wait(ms)` | Promise-based delay |
| `throttle(fn, ms)` | Throttle function execution |
| `debounce(fn, ms)` | Debounce function execution |
| `pick(obj, keys)` | Pick properties from object |
| `omit(obj, keys)` | Omit properties from object |
| `isNil(value)` | Check for null/undefined |
| `extendsObject(target, source)` | Deep extend object |
| `getBrowser()` | Detect browser |
| `getPlatform()` | Detect platform |
| `isProxiedValue(value)` | Duck-type check for proxied values (checks `$value` property) |
| `hasToJSON(value)` | Check if value has `toJSON` method |
| `clone*` | `cloneArray`, `cloneCommonObject`, `cloneDate`, `cloneMap`, `cloneSet` |

### Shared Types

`AnyObject`, `PrimitiveType`, `KebabCase`, `SearchParams`, `Hash`, `DeepReadonly`, `PickWritable`, `WritableKeys`, `IsAny`, `Typeof`, `DelimiterCase`, `OptionalKeys`, `RequiredKeys`, `StringKeyOf`, `NonNullablePrimitiveType`, `GetPrimitiveType`, `GetPrimitiveTypeClass`, `Browser`, `Platform`, etc.

---

## Domain Utilities

| Utility | Description |
|---------|-------------|
| `bindObservable(obs, callback)` | Binds a callback to an observable (handles both observable and plain values) |
| `getObservables(obj)` | Extracts all observable properties from an object |
| `isObservable(value)` | Type guard for observables |
| `startTracking()` / `stopTracking()` / `trackAccess(obs)` | Dependency auto-tracking for `useComputedObserve` / `useAsyncComputedObserve`. Uses a stack of `Set<ObservablePort>` — `trackAccess` is called from `ReactiveValue.valueOf()`, `ReactiveValue.toString()`, `ProxiedValue.valueOf()` |

---

## Testing

- **Test runner**: Bun (`bun test`)
- **Test DOM**: `@happy-dom/global-registrator`
- **Commands**:
  - `bun test` — run unit tests
  - `bun test --watch` — watch mode
  - `bun test --collect-coverage` — coverage
  - `bun test --update-snapshots` — update snapshots
  - `bun run e2e` — benchmark tests (MichiJS + Vanilla)
  - `bun run test-tsc` — TypeScript type checking (`michi-server --test-tsc`)
  - `bun run run-all-tests` — all tests + type check + benchmarks
- Test files use `.spec.ts` / `.spec.tsx` extensions
- Tests are excluded from compilation (`tsconfig.json`: `"exclude": ["src/**/*.spec.ts", "src/**/*.spec.tsx"]`)

---

## Build & Scripts

| Script | Description |
|--------|-------------|
| `bun run dist` | Build for distribution |
| `bun run dist-w` | Build in watch mode |
| `bun run start` | Dev server |
| `bun run link` | Watch build + bun link |
| `bun run generate` | Generate HTML types |
| `bun run test-tsc` | Type-check without emit |

### Package Exports

```json
{
  ".": { "node": "./dist/index.node.js", "import": "./dist/index.js" },
  "./jsx-runtime": "./dist/infrastructure/dom/jsx-runtime/index.js",
  "./jsx-dev-runtime": "./dist/infrastructure/dom/jsx-runtime/index.js",
  "./droppableFlags": "./droppableFlags.js"
}
```

---

## Conventions

1. **File naming**: PascalCase for classes/components/types, camelCase for hooks/utils
2. **Hook naming**: `use*` prefix for all hooks
3. **Port naming**: `*Port` suffix for all port interfaces
4. **Type guards**: Located in `typewards/` directories
5. **Barrel files**: Each major module has an `index.ts` re-exporting all public API
6. **Observables**: Never use `instanceof ProxiedValue` — use `isProxiedValue` (duck-type check on `$value`)
7. **Cross-layer imports**: Always use path aliases (`@domain`, `@ports`, `@shared`)
8. **Intra-layer imports**: Use relative paths
9. **English**: All code, comments, JSDoc, and documentation must be in English

---

## Known Limitations / Caveats

- `shared/` imports `@ports` for type-only imports — this is intentional and acceptable
- `useStorage` always uses `useObserveInternal` (always-proxied internal path), not affected by the `useProxied` parameter
- `I18n.createTranslation` explicitly passes `{ useProxied: true }` to `useAsyncComputedObserve`
- Safari built-in element support requires the `createBuiltInElement` polyfill
- `infrastructure/node/` (SSR) has not been fully audited in the architecture migration
