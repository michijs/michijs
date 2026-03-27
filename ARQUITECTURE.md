# Architecture — Hexagonal

```
src/
├── domain/                              # Core — zero infrastructure dependencies
│   ├── entities/
│   │   ├── garbage-collection/          # GarbageCollectableObject, GarbageCollectedEvent (WeakRef)
│   │   ├── IdGenerator.ts               # ID Generator
│   │   ├── MappedIdGenerator.ts         # Mapped ID Generator
│   │   ├── ObservableFromEventListener.ts
│   │   └── reactive/
│   │       ├── core/                    # Callable, CallableObservable, Observable,
│   │       │                            # ObservableWithValue, ReactiveArray, ReactiveValue
│   │       └── proxied/                 # ProxiedValue, ProxiedArray
│   │
│   ├── ports/                           # Interfaces/contracts (importable by any layer)
│   │   ├── HistoryManagerPort.ts
│   │   ├── VirtualFragmentPort.ts
│   │   ├── hooks/                       # UseObservePort, UseComputedObservePort, UsePromisePort, etc.
│   │   └── reactive/
│   │       ├── core/                    # ObservablePort, ReactiveValuePort, ReactiveArrayPort,
│   │       │                            # Subscription, TargetPort, ObservableOrConst, etc.
│   │       └── proxied/                 # ProxiedValuePort, ProxyHandlerPort, ObservableProxyPort,
│   │                                    # ParentSubscription, UnproxifyPort, etc.
│   │
│   ├── use-cases/
│   │   ├── hooks/                       # useObserve, useComputedObserve, useAsyncComputedObserve,
│   │   │   │                            # useWatch, usePromise, usePureFunction, useStringTemplate
│   │   │   └── tests/                   # Unit tests for hooks
│   │   ├── i18n/                        # I18n class — pure translation logic
│   │   └── proxyHandlers/               # ArrayProxyHandler, CommonObjectProxyHandler,
│   │                                    # DateProxyHandler, MapProxyHandler, SetProxyHandler,
│   │                                    # PrimitiveProxyHandler, FunctionProxyHandler, etc.
│   │
│   ├── utils/                           # getObservables, bindObservable
│   └── typewards/                       # isObservable
│
├── shared/                              # Utilities, types and typewards — no domain or infra dependencies
│   ├── types/                           # AnyObject, PrimitiveType, KebabCase, SearchParams,
│   │                                    # DeepReadonly, PickWritable, IsAny, Typeof, etc.
│   ├── typewards/                       # hasToJSON, isProxiedValue
│   └── utils/                           # unproxify, formatToKebabCase, getFormData, wait,
│       │                                # throttle, debounce, pick, omit, isNil, extendsObject,
│       │                                # getBrowser, getPlatform, getCSSStyleSheetText, etc.
│       └── clone/                       # cloneArray, cloneCommonObject, cloneDate, cloneMap, cloneSet
│
├── infrastructure/
│   ├── dom/                             # Adapter — Browser DOM
│   │   ├── index.ts                     # Barrel — exports entire DOM module
│   │   ├── global-types.ts              # Global Window augmentation
│   │   ├── custom-elements/             # createCustomElement, customElement, createElementProperties
│   │   │   ├── components/              # ElementInternals, Host, Slot
│   │   │   ├── properties/              # defineEvent, defineMethod, definePropertyFromObservable,
│   │   │   │                            # defineReflectedAttributes
│   │   │   └── typewards/               # isMichiCustomElement
│   │   ├── jsx-runtime/                 # Fragment, jsx, jsxs, jsxDEV
│   │   │   └── generated/               # JSX namespace (global augmentation)
│   │   │       └── htmlType/            # CSSProperties, DataGlobalAttributes, Events,
│   │   │           ├── Events/          # AllEvents, GlobalEvents, TypedEvent, TypedMouseEvent, etc.
│   │   │           └── generated/       # HTMLElements, SVGElements, MathMLElements, ValueSets
│   │   ├── rendering/                   # create, render, renderSync
│   │   │   ├── components/              # AsyncComponent, Fragment, GenericElement, If, List
│   │   │   └── typewards/               # isElement, isDOMElement, isHTMLElement, etc.
│   │   ├── routing/                     # createRouter
│   │   │   ├── components/              # Router
│   │   │   └── entities/HistoryManager/ # HistoryManager, ModernHistoryManager, LegacyHistoryManager
│   │   ├── styles/                      # css
│   │   │   ├── hooks/                   # useStyleSheet, useCssVariables, useAnimation, useTransition
│   │   │   └── typewards/               # isCSSObject, isCSSVariable
│   │   ├── storage/                     # Storage types
│   │   │   ├── entities/                # CookieStorage
│   │   │   ├── hooks/                   # useStorage, useIndexedDB
│   │   │   └── typewards/               # storageIsCookieStorage
│   │   ├── url/                         # URL types
│   │   │   ├── components/              # Redirect, Title
│   │   │   ├── hooks/                   # useHash, useSearchParams, useTitle
│   │   │   └── utils/                   # urlFn, createURL, normalizeURL, setSearchParam
│   │   ├── trusted-types/               # trustedTypePolicy, makeMichijsTheDefaultTrustedPolicy
│   │   └── polyfills/                   # createBuiltInElement (Safari built-in elements)
│   │
│   ├── platform/                        # Adapter — DOM-agnostic JS APIs
│   │   ├── index.ts                     # Barrel — exports entire platform module
│   │   ├── constants/                   # Namespaces (SVG, MathML, etc.)
│   │   ├── entities/                    # ElementArrayTarget, ElementProxiedArrayTarget, EventDispatcher
│   │   ├── network/                     # doFetch, doBlobFetch, doGenericFetch
│   │   │   └── hooks/                   # useFetch
│   │   └── types/                       # GetJSXProps, WithChildren
│   │
│   └── node/                            # Adapter — Node.js
│       └── rendering/                   # SSR: serialization to static HTML
│
│   └── plugin/                          # Adapter — esbuild build plugin
│       ├── index.ts                     # Barrel — exports michiJSXPlugin
│       ├── michiJSXPlugin.ts            # esbuild Plugin (onLoad hook, two-phase transform)
│       └── transformJSX.ts              # Core JSX-to-DOM transform engine
│
├── index.ts                             # Main entry point (browser)
├── index.node.ts                        # Node.js entry point
├── jsx-runtime.tsx                      # Re-export JSX runtime
└── jsx-dev-runtime.tsx                  # Re-export JSX dev runtime
```

## Dependency rules between layers

```
shared ──────► (no domain or infrastructure dependencies)
               Can only import from @ports for types (type-only imports)

domain ──────► @shared, @ports
               NEVER imports from infrastructure

infrastructure ► @domain, @ports, @shared
                 Cross-layer imports use aliases, not relative paths
```

### Details

| Layer | Can import from | CANNOT import from |
|-------|----------------|-------------------|
| `shared/` | `@ports` (only `import type`) | `@domain` (values), `@infrastructure` |
| `domain/entities/` | `@shared`, `@ports` | `@infrastructure` |
| `domain/ports/` | `@domain`, `@shared` | `@infrastructure` |
| `domain/use-cases/` | `@shared`, `@ports`, relative entities | `@infrastructure` |
| `infrastructure/` | `@domain`, `@ports`, `@shared` | relative paths crossing layers |

## Barrel files (index.ts)

Each main module exposes a barrel that re-exports all its public content:

| Barrel | What it exports |
|--------|----------------|
| `src/domain/index.ts` | All domain entities, use-cases, utils and typewards + re-export of ports |
| `src/domain/ports/index.ts` | All interfaces/contracts (36 exports) |
| `src/shared/index.ts` | All shared utils, types and typewards |
| `src/infrastructure/dom/index.ts` | Entire DOM module: custom-elements, jsx-runtime, rendering, styles, routing, storage, url, trusted-types, polyfills, typewards, global augmentations |
| `src/infrastructure/platform/index.ts` | Entire platform module: constants, entities, network, types |
| `src/infrastructure/plugin/index.ts` | esbuild plugin: `michiJSXPlugin`, `transformJSXCalls`, `generateHelperImports` |

## Dependency diagram

```mermaid
graph TD
    subgraph shared["Shared"]
        shared_types["types/"]
        shared_typewards["typewards/"]
        shared_utils["utils/"]
    end

    subgraph domain["Domain"]
        ports["ports/"]
        entities["entities/"]
        usecases["use-cases/"]
        domain_utils["utils/"]
        domain_typewards["typewards/"]
    end

    subgraph infrastructure["Infrastructure"]
        subgraph dom["dom/"]
            ce["custom-elements/"]
            jsx["jsx-runtime/"]
            rendering["rendering/"]
            styles["styles/"]
            routing["routing/"]
            storage["storage/"]
            url["url/"]
            tt["trusted-types/"]
        end
        subgraph platform["platform/"]
            net["network/"]
            plat_entities["entities/"]
        end
        node_ssr["node/"]
        plugin["plugin/"]
    end

    %% Dependency arrows
    entities -->|"@shared"| shared
    entities -->|"@ports"| ports
    usecases -->|"@shared"| shared
    usecases -->|"@ports"| ports
    domain_utils -->|"@ports"| ports

    dom -->|"@domain"| domain
    dom -->|"@shared"| shared
    dom -->|"@ports"| ports
    platform -->|"@domain"| domain
    platform -->|"@shared"| shared
    platform -->|"@ports"| ports

    shared_typewards -.->|"type-only"| ports
```
