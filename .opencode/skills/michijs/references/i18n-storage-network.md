# I18n, Storage & Network Reference

## `I18n`

`src/domain/use-cases/i18n/I18n.ts:11`. Extends `ReactiveValue<K>` — the current language is itself an observable.

```ts
class I18n<K extends string> extends ReactiveValue<K> {
  constructor(supportedLanguages: K[], languageObservable?: ReactiveValuePort<string>);
  get supportedLanguages(): K[];
  get currentLanguage(): K;
  get defaultLanguage(): K;
  createTranslation<T>(translations: Record<K, T | (() => Promise<{ default: T }>)>): T;
}
```

Auto-detects `navigator.languages`, falls back to exact (`"en-US"`) → general (`"en"`) → first language passed.

### Example

```tsx
import { I18n, useStorage } from "@michijs/michijs";
import en from "./i18n/en";

const { lang } = useStorage({ lang: navigator.language });
const i18n = new I18n(["en-uk", "es"], lang);

const t = i18n.createTranslation({
  "en-uk": en,
  es: () => import("./i18n/es"),     // lazy
});

// In a component:
<select onchange={(ev: any) => lang(ev.target.value)}>
  {i18n.supportedLanguages.map(k => (
    <option selected={i18n.currentLanguage === k} value={k}>{t[k]}</option>
  ))}
</select>
<p>{t.greeting}</p>
<p>{t.birthDay(new Date(1997, 7, 2))}</p>
```

### Translation file shape

```ts
// i18n/en.ts
export default {
  greeting: "Hello",
  language: "Language",
  "en-uk": "English (UK)",
  es:      "Spanish",
  birthDay: (date: Date) => `My birthday is ${date.toLocaleDateString("en-uk")}`,
  list: ["one", "two"],
};
```

## `useStorage`

```ts
useStorage<T extends object>(item: T, storage?: Storage): ObservableProxyPort<T>;
```

Defaults to `localStorage`. Listens for cross-tab `storage` events and updates automatically.

```tsx
const { lang, count } = useStorage({ lang: navigator.language, count: 0 });
count(count() + 1);                  // sync to storage immediately
```

### `CookieStorage`

`src/infrastructure/dom/storage/entities/CookieStorage.ts:45`. Implements `Storage` using the `cookieStore` API.

```tsx
import { useStorage, CookieStorage } from "@michijs/michijs";

const { count } = useStorage(
  { count: 0 },
  new CookieStorage({ expires: Date.now() + 400 * 24 * 60 * 60 * 1000 }),
);
```

## `useIndexedDB`

```ts
useIndexedDB<Schema>(name: string, stores: { [K in keyof Schema]: IDBObjectStoreParameters }, version?: number)
  : Observable<keyof Schema> & { [K in keyof Schema]: IDBObjectStoreLike };
```

Returns a Proxy: `db.<store>.<method>(...)` returns Promises. The proxy itself is an `Observable<string>` notified with the changed store name (cross-tab via BroadcastChannel).

```tsx
import { useIndexedDB, useAsyncComputedObserve } from "@michijs/michijs";

const db = useIndexedDB<{
  counter: { count: number; id: number };
}>("counter-db", { counter: { keyPath: "id" } });

const initial = (await db.counter.get(1))?.count ?? 0;
const count = useAsyncComputedObserve(
  async () => (await db.counter.get(1))?.count ?? 0,
  initial,
  [db],
);

await db.counter.put({ id: 1, count: count() + 1 });
```

## Network

### `doFetch` / `doGenericFetch`

```ts
type DoFetchProps<S = AnyObject, B = AnyObject> = RequestInit & {
  input: string | URL | RequestInfo;
  searchParams?: S;
  body?: B;
};
doGenericFetch<S, B>(props: DoFetchProps<S, B>): Promise<Response>;
doFetch<R, S = any, B = any>(props: DoFetchProps<S, B>): Promise<R>;   // = response.json()
doBlobFetch(props): Promise<Blob>;
```

- `input` starting with `/` is resolved against `location.origin`.
- `body` is `JSON.stringify`-ed automatically (unless it's a `FormData`/`Blob`/string).
- Throws on non-OK with parsed error message.

### `useFetch`

```ts
useFetch<R>(callback: () => Promise<DoFetchProps>, shouldWait?): {
  promise: ObservableProxyPort<Promise<R>>;
  recall(): Promise<void>;
};
```

```tsx
const { promise, recall } = useFetch(async () => ({
  input: "https://api.github.com/repos/michijs/michijs",
  headers: { Accept: "application/vnd.github+json" },
}));

<button onpointerup={recall}>Reload</button>
{promise().then(repo => <p>Stars: {repo.stargazers_count}</p>)}
```
