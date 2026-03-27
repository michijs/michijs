## 2.4.0

### Architecture — Hexagonal migration
The entire `src/michijs/` flat structure has been reorganized into a hexagonal (ports & adapters) architecture with three layers:

- **`domain/`** — Core logic, zero infrastructure dependencies
- **`shared/`** — Pure utilities, types, and type guards
- **`infrastructure/`** — Platform adapters (`dom/`, `platform/`, `node/`)

### Added
- **esbuild plugin** (`@michijs/michijs/plugin`): Full JSX-to-DOM transform that converts `jsx()` runtime calls into direct `document.createElement` / `document.createElementNS` / `document.createDocumentFragment` calls at build time, eliminating `ElementFactory` runtime dispatching entirely. Features:
  - Observable support — attribute values and children that are observables are bound reactively via `bindObservable` and `GarbageCollectableObject`
  - SVG/MathML namespace propagation — children of `<svg>` and `<math>` elements are created with `createElementNS`
  - Style object support — each style property individually reactive
  - Event handling — `on*` attributes converted to `addEventListener`
  - `_` property binding — direct DOM property assignment with observable support
  - Promise children — placeholder comment nodes replaced on resolution
  - Fragment support — `<>...</>` mapped to `DocumentFragment`
  - Dynamic/function tags — runtime dispatch for component functions
  - Per-file tree-shaken helpers — only injects the helper functions actually used
- Port interfaces (`@ports`): `ProxyHandlerPort`, `ObservableProxyPort`, `ProxiedValuePort`, `UnproxifyPort`, `ObservablePort`, `ReactiveValuePort`, `ReactiveArrayPort`, `TargetPort`, `Subscription`, `ParentSubscription`, `HistoryManagerPort`, `VirtualFragmentPort`, `UseObservePort`, `UseComputedObservePort`, `UsePromisePort`, `UsePureFunctionPort`, `UseStringTemplatePort`, `UseWatchPort`, `UseAsyncComputedObservePort`, and more
- TypeScript path aliases: `@domain`, `@domain/*`, `@ports`, `@shared`, `@shared/*`
- Barrel files for each module: `domain/index.ts`, `domain/ports/index.ts`, `shared/index.ts`, `infrastructure/dom/index.ts`, `infrastructure/platform/index.ts`
- Architecture documentation: `ARQUITECTURE.md` with directory tree, dependency rules, and Mermaid dependency diagram
- Duck-type `isProxiedValue` type guard in `shared/typewards/` — avoids cross-layer `instanceof` checks
- Reactive core entities extracted: `Callable`, `CallableObservable`, `Observable`, `ReactiveValue`, `ReactiveArray`, `ProxiedValue`
- Shared types extracted: `AnyObject`, `PrimitiveType`, `KebabCase`, `SearchParams`, `DeepReadonly`, `PickWritable`, `IsAny`, `Typeof`, `Browser`, `Platform`, and more

### Changed
- **Breaking: `usePrimitive` renamed to `useProxied` with inverted default behavior.** `useObserve`, `useComputedObserve`, and `useAsyncComputedObserve` now return a lightweight reactive value (similar to tc39 signals) by default. Pass `useProxied: true` to opt into the deep-proxy observable that was previously the default. The old `PrimitiveValue` class has been renamed to `ReactiveValue`.
- All source files moved from `src/michijs/` to `src/domain/`, `src/shared/`, or `src/infrastructure/`
- Cross-layer imports now use path aliases (`@domain`, `@ports`, `@shared`) instead of relative paths
- `getCSSStyleSheetText` moved from infrastructure to shared (pure function, zero DOM deps)
- `getFormData` decoupled from infrastructure's `TypedEvent` — now uses native `Event` type
- `unproxify` uses duck-type `isProxiedValue` instead of `instanceof ProxiedValue`
- JSX runtime export paths updated in `package.json` to reflect new directory structure
- Test files moved from `tests/` to `examples/` (non-unit-test examples)
- `tests.tsconfig.json` and `examples.tsconfig.json` added for separate compilation scopes

### Removed
- `src/michijs/` directory — fully replaced by the new layered structure
- `dist.tsconfig.json` — replaced by updated build configuration
- `jsx-runtime/` top-level re-export directory — exports now point directly to `dist/infrastructure/dom/jsx-runtime/`

## 2.3.0
- Updated If to be aligned with new CSS if API. Now it works like a switch and is not a component anymore
- Deprecated primitive hooks - now they are available in the options of useObserve / useComputedObserve / useAsyncComputedObserve
- Separated legacy cookie storage from modern one

## 2.2.0
- Added compute 
- deprecated not 
- deprecated toBoolean 
- .is() now returns an observableType

## 2.1.21
- Added List component

## 2.1.0
- Added useObservePrimitive
- Added useComputedObservePrimitive

## 2.0.0

### Added
- useCssVariables 
- useAnimation 
- useTransition 
- useComputedObserve
- useFetch
- useHash
- usePromise
- usePureFunction
- useIndexedDB
- useSearchParams
- useStringTemplate
- useTitle
- useWatch
- useAsyncComputedObserve
- Safari partial support for built-in elements
- CookieStorage
- New History manager based on Navigation API
- Slot support without shadow dom
- doFetch
- If and GenericElement added
- New callbacks for custom elements

### Updated
- Diff algorithm was replaced with observables
- Improved typescript performance
- Improved operations performance
- JSX is now included in Michijs and not in a separated package
- Routing was simplified
- I18n was simplified
- No sideEffects
- Moved everything to bun
- Logo has new variants
- "a" tag now supports URL objects

### Renamed
- observe -> useObserve
- createStyleSheet -> useStyleSheet
- storedObservable -> useStorage
- willReceiveAttribute -> willReceiveAttributeCallback

### Deprecated
- Fragment - List - ElementList - Link
- All the "special" attributes
- createCustomElement following properties:
  * observe: Replaced with useComputedObserve
  * nonObservedAttributes: Use const on render function or in constructor
  * transactions: Not supported anymore
  * willUpdate and didUpdate callbacks
  * subscribeTo: Not needed anymore - use Observables instead
  * fakeRoot: Not needed anymore - use Slots - diff algorithm does not need it
  * rerender
