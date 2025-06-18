## 2.3.0
- Updated If to be aligned with new CSS if API. Now it works like a switch and is not a component anymore
- Deprecated primitive hooks - now they are available in the options of useObserve / useComputedObserve / useAsyncComputedObserve

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
