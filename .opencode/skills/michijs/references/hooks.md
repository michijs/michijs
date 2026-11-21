# Hooks Reference

All hooks live in `src/domain/use-cases/hooks/` and may be called at **module scope** (singleton state) or inside components/functions.

## `useObserve`

```ts
useObserve<T>(item: T, useProxied: true):  ObservableProxyPort<T>;
useObserve<T>(item: T, useProxied?: false): CallableReactiveValuePort<T>;
```

Lightweight (default) is a TC39-style signal:

```tsx
const count = useObserve(0);
count();                       // read
count(5);                      // write
count.subscribe(v => …);       // listen
count.compute(v => v + 1);     // derived observable
```

Deep-proxy (for objects/arrays/maps/sets/dates):

```tsx
const state = useObserve({ todos: [] as string[] }, true);
state.todos.push("buy milk");  // triggers reactivity
state.todos.length;            // observable
```

For non-supported complex objects (File, Blob, etc.) cast as `ObservableComplexObject<File>`.

**Gotcha:** A function stored on an observable should never mutate the observable that holds it.

## `useComputedObserve`

```ts
useComputedObserve<T>(callback: () => T): CallableReactiveValuePort<T>;
useComputedObserve<T>(
  callback: () => T,
  deps: ObservablePort<any>[],
  options?: {
    onBeforeUpdate?(): void;
    onAfterUpdate?(): void;
    useProxied?: boolean;
  },
): CallableReactiveValuePort<T> | ObservableProxyPort<T>;
```

When `deps` is omitted, dependencies are auto-detected via `startTracking()/stopTracking()`. The tracker re-detects deps on each recomputation and only subscribes/unsubscribes deltas.

```tsx
const a = useObserve(2), b = useObserve(3);
const sum     = useComputedObserve(() => a() + b());                      // auto
const labeled = useComputedObserve(() => `${a()}+${b()}=${a()+b()}`,
                                   [a, b]);                               // explicit
```

## `useAsyncComputedObserve`

```ts
useAsyncComputedObserve<T>(
  callback: (signal: AbortSignal) => Promise<T>,
  initialValue: T,
  deps?: ObservablePort<any>[],
  options?: { onBeforeUpdate?(): void; onAfterUpdate?(): void; useProxied?: boolean },
): CallableReactiveValuePort<T> | ObservableProxyPort<T>;
```

A newer invocation aborts the older one (the `signal` aborts). With auto-tracking, only **synchronous** reads before the first `await` are tracked.

```tsx
const userId = useObserve(1);
const user = useAsyncComputedObserve(
  async (signal) => (await fetch(`/api/users/${userId()}`, { signal })).json(),
  null,
);
```

## `useWatch`

```ts
useWatch(callback: Subscription, deps?: ObservablePort<any>[]): void;
```

Subscribes a callback to each dep. **Does not fire initially.**

```tsx
useWatch(() => console.log("changed:", count()), [count]);
```

## `usePromise`

```ts
usePromise<T>(callback: () => Promise<T>, shouldWait?: (Promise<any> | (() => Promise<any>))[])
  : { promise: ObservableProxyPort<Promise<T>>; recall(): Promise<void>; };
```

```tsx
const { promise, recall } = usePromise(async () => (await fetch("/api/data")).json());
promise().then(data => …);
recall();   // re-run
```

## `usePureFunction`

```ts
usePureFunction<T>(callback: () => T, deps?: ObservablePort<any>[]): () => T;
```

Memoized closure that recomputes only when any dep notifies.

## `useStringTemplate`

```tsx
const a = useObserve(3);
const greeting = useStringTemplate`Hello ${a}!`;   // observable string "Hello 3!"
```

## Observable instance methods (commonly used)

- `obs()` — read.
- `obs(value)` — write (only on `CallableReactiveValuePort` / `ObservableProxyPort`).
- `obs.subscribe(fn)` — listen, returns unsubscribe.
- `obs.compute(fn)` — derived observable.
- `obs.valueOf()` / `obs.toString()` — implicit conversions (used by JSX text nodes).
