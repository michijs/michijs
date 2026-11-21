# Routing Reference

## `createRouter`

```ts
function createRouter<R extends Record<string, JSX.Element>>(
  routes: R,
  parentRoute?: UrlFunction,
): [
  urls:   { [K in keyof R]: UrlFunction<K> },
  Router: FC,
];
```

- The **last-defined route is the default fallback.**
- Route keys may include `:param` segments; the corresponding `UrlFunction` then requires a `params` argument with those names.

```tsx
import { AsyncComponent, createRouter } from "@michijs/michijs";
import { Main } from "./pages/Main";

export const [urls, Router] = createRouter({
  performance:    <AsyncComponent promise={() => import("./pages/PerformanceTests")}/>,
  "users/:id":    <AsyncComponent promise={() => import("./pages/UserPage")}/>,
  "/":            <Main/>,                    // default fallback
});
```

### Generating URLs

```tsx
urls.performance();                                          // "/performance"
urls.performance({ searchParams: { q: "x" }, hash: "#top" });
urls["users/:id"]({ params: { id: "42" } });                // "/users/42"
urls["users/:id"]({ params: { id: "42" }, searchParams: { tab: "bio" } });
```

The `params` arg is **required** when the route has dynamic segments and **type-checked** to the exact param names.

### Nested routers

```tsx
const [child, ChildRouter] = createRouter(
  { profile: <UserProfile/> },
  urls["users/:id"],
);
// child.profile({ params: { id: "1" } })  → "/users/1/profile"
```

Render the child router inside the parent route's component:

```tsx
const UserPage = () => (
  <>
    <h1>User {useParams("/users/:id").id}</h1>
    <ChildRouter/>
  </>
);
```

## URL hooks

### `useHash`

```tsx
const hash = useHash<"#section1" | "#section2">();
hash["#section1"](true);                              // adds #section1
hash["#section1"].compute(v => `is ${Boolean(v)}`);   // derived observable
```

### `useSearchParams`

```tsx
const params = useSearchParams<{ q: string; counter: number }>();
params.q("hello");
const link = useStringTemplate`?q=${params.q}`;
```

### `useParams`

Typed from the route pattern:

```tsx
const p = useParams("/users/:id/profile");   // ObservableProxyPort<{ id: string }>
<div>User: {p.id}</div>
```

A second argument lets you derive params relative to a parent route.

### `useTitle`

```tsx
const title = useTitle();
title("New page title");

// Or via the Title component:
<Title>{useStringTemplate`User ${p.id}`}</Title>
```

## Imperative navigation

```ts
import { handleNavigation } from "@michijs/michijs";
handleNavigation(urls.performance());   // pushes state and triggers Router
```

## `Redirect`

```tsx
<Redirect to={urls.home()} />
<Redirect to={() => urls.userPage({ params: { id: currentId() } })} />
```
