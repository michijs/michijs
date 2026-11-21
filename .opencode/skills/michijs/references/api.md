# Public API Reference

`@michijs/michijs` v2.x. All citations are `file:line`.

Top-level entry: `src/index.ts` re-exports `domain`, `infrastructure/dom`, `shared`, `infrastructure/platform`. Node-side entry (`src/index.node.ts`) swaps `infrastructure/dom` for `infrastructure/node` (renders JSX to strings).

## Reactive hooks (`#domain` / use-cases/hooks)

| Hook | Purpose |
|---|---|
| `useObserve<T>(item, useProxied?)` | Make a value observable. `useProxied: true` → deep proxy. |
| `useComputedObserve<T>(fn, deps?, options?)` | Derived observable. Auto-tracks deps when omitted. |
| `useAsyncComputedObserve<T>(fn, initial, deps?, options?)` | Async derived observable; aborts stale runs via `AbortSignal`. |
| `useWatch(callback, deps?)` | Subscribe a callback to deps. Does **not** fire initially. |
| `usePromise<T>(fn, shouldWait?)` | `{promise, recall()}` wrapper. |
| `usePureFunction<T>(fn, deps?)` | Memoized function recomputed when any dep notifies. |
| `useStringTemplate` | Tagged template → reactive string observable. |

## Custom-element APIs (`infrastructure/dom/custom-elements`)

| Export | Purpose |
|---|---|
| `createCustomElement(tag, options)` | Define & register a custom element. |
| `customElement\`my-tag\`(options)` | Tagged-template alternative. |
| `Host` | Represents the host element inside `render()`. |
| `Slot` | `<slot>` wrapper that polyfills outside Shadow DOM. |
| `ElementInternals` | Set ARIA + form values reactively (requires `formAssociated`). |
| `isMichiCustomElement` | Type guard. |
| `getMountPoint`, `getShadowRoot` | Low-level helpers. |

## Rendering components

| Export | File |
|---|---|
| `If` | `infrastructure/dom/rendering/components/If.ts:113` |
| `List` | `…/List.ts:62` |
| `AsyncComponent` | `…/AsyncComponent.ts:35` |
| `Fragment` | `…/Fragment.ts:1` (alias `null`) |

## Routing (`infrastructure/dom/routing`)

| Export | File |
|---|---|
| `createRouter(routes, parentRoute?)` | `createRouter.ts:7` — returns `[urls, Router]` |
| `Router` | `components/Router.ts:7` |
| `Redirect` | `components/Redirect.tsx:15` |
| `Title` | `components/Title.tsx:13` |
| `useHash` | `hooks/useHash.ts:23` |
| `useSearchParams` | `hooks/useSearchParams.ts:27` |
| `useParams` | `hooks/useParams.ts:36` |
| `useTitle` | `hooks/useTitle.ts:11` |
| `HistoryManager`, `LegacyHistoryManager`, `ModernHistoryManager` | URL change abstraction |
| `handleNavigation` | Imperative navigation |
| `setSearchParam` | URL helper |

## Styles (`infrastructure/dom/styles`)

| Export | File |
|---|---|
| `useStyleSheet(cssOrCallback, $window?)` | `hooks/useStyleSheet.ts:134` |
| `useCssVariables<T>()` | `hooks/useCssVariables.ts:20` |
| `useAnimation(keyframes, opts)` | `hooks/useAnimation.ts:18` |
| `useTransition(props)` | `hooks/useTransition.ts:9` |
| `css` template literal | `styles/css.ts` |

Types: `CSSObject`, `CSSProperty`, `CssVariablesObject`, `CSSVar`, `UseStyleSheet`.

## Storage (`infrastructure/dom/storage`)

| Export | Purpose |
|---|---|
| `useStorage(item, storage?)` | Sync object with `localStorage` (default), `sessionStorage`, or `CookieStorage`. |
| `useIndexedDB(name, stores, version?)` | Proxy with cross-tab BroadcastChannel sync. |
| `CookieStorage` | `Storage`-compatible class backed by `cookieStore` API. |

## Network (`infrastructure/platform/network`)

| Export | Purpose |
|---|---|
| `doFetch<R>(props)` | Fetch + auto JSON. |
| `doGenericFetch(props)` | Returns `Response`. |
| `doBlobFetch` | Returns Blob. |
| `useFetch(callback, shouldWait?)` | `{promise, recall}` wrapper around fetch. |

## Reactive entities (classes from `#domain`)

`Observable`, `ObservableWithValue`, `Callable`, `CallableObservable`, `ReactiveValue`, `ReactiveArray`, `ProxiedValue`, `ProxiedArray`, `ObservableFromEventListener`, `IdGenerator`, `MappedIdGenerator`, `GarbageCollectableObject`, `GarbageCollectedEvent`.

## Domain utilities

`unproxify`, `bindObservable`, `getObservables`, `isObservable`, `startTracking`, `stopTracking`, `trackAccess`.

## I18n

`I18n` class — `src/domain/use-cases/i18n/I18n.ts:11`. Extends `ReactiveValue<K>`; the language is itself an observable.

## Platform / misc

`EventDispatcher`, `Namespaces` constant, `setSearchParam`.

## Selected types

From `#ports`: `ObservablePort`, `ReactiveValuePort`, `CallableReactiveValuePort`, `ObservableProxyPort`, `ProxiedValuePort`, `ObservableOrConst`, `ObservableOrConstOrPromise`, `Subscription`, `ParentSubscription`, `UnproxifyPort`.

From rendering: `FC`, `FCC`, `FCProps`, `SingleJSXElement`, `ObjectJSXElement`, `ClassJSXElement`, `FunctionJSXElement`, `FragmentJSXElement`, `GetElementProps`, `ListProps`.

From custom-elements: `MichiElementOptions`, `MichiElementClass`, `MichiElementSelf`, `MichiCustomElement`, `MichiProperties`, `Lifecycle`, `LifecycleInternals`, `CustomElementTag`, `EventsType`, `AttributesType`, `ExtendsType`, `MichiAttributes`, `CEEvent`.

From `#shared`: `AnyObject`, `KebabCase`, `DeepReadonly`, `PrimitiveType`, `Hash`, `SearchParams`, `WritableKeys`, `PickWritable`, `OptionalKeys`, `RequiredKeys`, `IsAny`, `Browser`, `Platform`.

## Package exports map

```jsonc
{
  ".": { "node": "./dist/index.node.js", "import": "./dist/index.js" },
  "./jsx-runtime":     { "node": "…/node/jsx-runtime/index.js", "import": "…/dom/jsx-runtime/index.js" },
  "./jsx-dev-runtime": { "node": "…/node/jsx-runtime/index.js", "import": "…/dom/jsx-runtime/index.js" },
  "./droppableFlags":  "./droppableFlags.js"
}
```

The `node` condition swaps in the Node JSX runtime so the same components can render to a string for static HTML generation.
