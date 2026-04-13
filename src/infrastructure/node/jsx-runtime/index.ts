/**
 * Node.js JSX runtime for server-side rendering.
 * Converts JSX to HTML strings.
 *
 * - No observables or properties (`_`) support
 * - Events are serialized as string attributes (e.g. `onclick="doSomething()"`)
 * - Function components are called and their string result is returned
 * - Void elements are self-closing
 */

/** HTML void elements that must be self-closing (no closing tag). */
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Escapes special HTML characters in attribute values.
 */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Escapes special HTML characters in text content.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Converts a camelCase CSS property name to kebab-case.
 * E.g. `backgroundColor` -> `background-color`.
 * Vendor prefixes like `WebkitTransform` -> `-webkit-transform`.
 */
function camelToKebab(str: string): string {
  return str.replace(
    /[A-Z]/g,
    (match, offset) => `${offset > 0 ? "-" : ""}${match.toLowerCase()}`,
  );
}

/**
 * Converts a CSSProperties-like object to an inline style string.
 */
function styleToString(
  style: Record<string, string | number | null | undefined>,
): string {
  const parts: string[] = [];
  for (const key in style) {
    const value = style[key];
    if (value == null) continue;
    // CSS custom properties (--*) are used as-is
    const cssKey = key.startsWith("--") ? key : camelToKebab(key);
    const cssValue =
      typeof value === "number" && value !== 0 && !cssKey.startsWith("--")
        ? `${value}px`
        : String(value);
    parts.push(`${cssKey}: ${cssValue}`);
  }
  return parts.join("; ");
}

/**
 * Renders children to a string.
 * Handles strings, numbers, arrays, null/undefined/boolean (ignored).
 */
function renderChildren(children: unknown): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string") return escapeHtml(children);
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(renderChildren).join("");
  // Already rendered JSX (string from nested jsx calls)
  return String(children);
}

/**
 * Serializes attributes to an HTML attribute string.
 * Handles:
 * - boolean attributes (true -> present, false -> omitted)
 * - style objects -> inline style string
 * - event handlers (functions) -> serialized to string via `.toString()`
 * - null/undefined -> omitted
 * - everything else -> escaped string value
 */
function serializeAttrs(attrs: Record<string, unknown>): string {
  const parts: string[] = [];
  for (const key in attrs) {
    if (key === "children") continue;
    const value = attrs[key];
    if (value == null || value === false) continue;
    if (value === true) {
      parts.push(` ${key}`);
      continue;
    }
    if (key === "style" && typeof value === "object") {
      const styleStr = styleToString(
        value as Record<string, string | number | null | undefined>,
      );
      if (styleStr) parts.push(` style="${escapeAttr(styleStr)}"`);
      continue;
    }
    if (typeof value === "function") {
      parts.push(` ${key}="${value.toString()}"`);
      continue;
    }
    parts.push(` ${key}="${escapeAttr(String(value))}"`);
  }
  return parts.join("");
}

/**
 * JSX factory function for Node.js server-side rendering.
 * Produces HTML strings.
 *
 * @param tag - Either a string tag name (e.g. "div") or a function component.
 * @param attrs - The attributes/props object, including `children`.
 * @returns An HTML string.
 */
function jsx(
  tag: string | ((props: Record<string, unknown>) => string),
  attrs: Record<string, unknown> = {},
): string {
  // Function component — call it and return its result
  if (typeof tag === "function") {
    return tag(attrs);
  }

  // Fragment sentinel — just render children
  if (tag === null || tag === undefined) {
    return renderChildren(attrs.children);
  }

  const attrStr = serializeAttrs(attrs);

  // Void element — self-closing, no children
  if (VOID_ELEMENTS.has(tag)) {
    return `<${tag}${attrStr}>`;
  }

  const childrenStr = renderChildren(attrs.children);
  return `<${tag}${attrStr}>${childrenStr}</${tag}>`;
}

/**
 * Fragment sentinel for the Node JSX runtime.
 * When used as a JSX tag, children are concatenated without a wrapper element.
 */
// biome-ignore lint: Fragment is intentionally null cast
const Fragment = null as unknown as () => null;

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
