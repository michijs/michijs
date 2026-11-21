# Styles Reference

MichiJS uses **constructable stylesheets** (`CSSStyleSheet` instances) wired into `adoptedStyleSheets`. Every value can be an observable, so style properties update granularly.

## `CSSObject`

```ts
type CSSProperty = CSSObject | CSSProperties | string | number | undefined | null;
interface CSSObject { [key: string]: ObservableOrConst<CSSProperty>; }
```

Keys can be:
- CSS properties in **camelCase** (auto-converted to kebab-case).
- Selectors: `"&:hover"`, `":host"`, `"::part(x)"`, `"button.primary"`, etc.
- At-rules: `"@media (max-width: 600px)"`, `"@keyframes fade"`.
- Nested groups follow the SCSS-like `&` convention.

## `useStyleSheet`

Two overloads (`hooks/useStyleSheet.ts:134`):

```ts
useStyleSheet(cssObject: CSSObject, $window?: Window): CSSStyleSheet;
useStyleSheet<T>(
  callback: (selector: string, cssVars: CssVariablesObject<T>) => CSSObject,
  $window?: Window,
): (selector: string) => CSSStyleSheet;
```

### Object form (most common)

```tsx
import { useStyleSheet } from "@michijs/michijs";

export const counterStyle = useStyleSheet({
  ":host": {
    display: "inline-flex",
    flexDirection: "row",
    "(:disabled)": { backgroundColor: "gray" },
    "@media (max-width: 600px)": { color: "blue" },
  },
  span: { minWidth: "60px", textAlign: "center" },
  "button:hover": { cursor: "pointer" },
});

createCustomElement("a-counter", {
  adoptedStyleSheets: { counterStyle },
  // …
});
```

### Callback form (gives you the host selector — useful for `computedStyleSheet`)

```tsx
export const dialogStyle = useStyleSheet((tag) => ({
  [tag]: { opacity: 0, "[open]": { opacity: 1 } },
}));
```

### `computedStyleSheet` on an element

Use when styles must depend on element state:

```tsx
createCustomElement("color-box", {
  cssVariables: { color: "red" },
  computedStyleSheet(selector) {
    return {
      [selector]: {
        backgroundColor: this.color,
        margin: useComputedObserve(() => `${this.size()}px`),
      },
    };
  },
});
```

## `useCssVariables`

Typed proxy that returns `var(--name)` strings:

```tsx
const cssVars = useCssVariables<{ theme: string; systemColor: string }>();

cssVars.theme;           // "var(--theme)"
cssVars.theme("red");    // "var(--theme,red)" — call to add a fallback
```

Combine with `cssVariables` / `reflectedCssVariables` on a custom element:

```tsx
createCustomElement("theme-host", {
  reflectedCssVariables: { theme: "light" },
  computedStyleSheet(s) { return { [s]: { color: cssVars.theme } }; },
});
```

## `useAnimation`

```tsx
const [hideKeyframes, hideProps] = useAnimation(
  [{ opacity: 1 }, { opacity: 0 }],
  { duration: "2s", fill: "forwards" },
);

useStyleSheet({
  ...hideKeyframes,
  ".hidden": { ...hideProps },
});
```

Returns `[CSSObject (the @keyframes rule), CSSObject (animation properties)]`.

## `useTransition`

```tsx
const opacityT = useTransition({ property: ["opacity"], duration: "1s" });

useStyleSheet((tag) => ({
  [tag]: {
    ...opacityT,
    opacity: 0,
    "[open]": { opacity: 1 },
  },
}));
```

## `css` template literal

For when you prefer raw CSS strings:

```tsx
import { css } from "@michijs/michijs";

const counterStyle = css`
  :host { display: flex; }
  span { min-width: 60px; }
`;
```

## `adoptedStyleSheets` outside Shadow DOM

If `shadow: false`, MichiJS still adopts the stylesheet but scopes it via a generated `.michijs-N` class — it auto-rewrites `:host` rules to use that class. So your styles still work, but selectors targeting the shadow boundary won't behave identically.
