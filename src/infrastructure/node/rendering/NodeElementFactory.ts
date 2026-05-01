import type { ElementFactoryPort } from "#domain";
import type { AnyObject } from "#shared";

/** JSX element types for server-side rendering. */
export type NodeSingleJSXElement =
  | string
  | number
  | boolean
  | null
  | undefined
  | NodeSingleJSXElement[]
  | NodeObjectJSXElement
  | NodeFunctionJSXElement
  | NodeFragmentJSXElement;

interface NodeCommonJSXAttrs<T> {
  attrs: Record<string, unknown> & {
    children?: NodeSingleJSXElement | NodeSingleJSXElement[];
  };
  jsxTag: T;
}

export interface NodeObjectJSXElement extends NodeCommonJSXAttrs<string> {}
export interface NodeFunctionJSXElement
  extends NodeCommonJSXAttrs<
    (props: Record<string, unknown>, factory: NodeElementFactory) => string
  > {}
export interface NodeFragmentJSXElement
  extends NodeCommonJSXAttrs<null | undefined> {}

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

/** Escapes special HTML characters in attribute values. */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Escapes special HTML characters in text content. */
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
 * Node.js implementation of ElementFactoryPort for server-side rendering.
 * Produces HTML strings from JSX element descriptors.
 *
 * - No observables or properties (`_`) support
 * - Events are serialized as string attributes (e.g. `onclick="doSomething()"`)
 * - Function components are called and their string result is returned
 * - Void elements are self-closing
 */
export class NodeElementFactory
  implements ElementFactoryPort<unknown, NodeSingleJSXElement>
{
  contextElement?: unknown;

  /**
   * Serializes attributes into an HTML attribute string.
   * In the SSR context, the `el` parameter is unused — attributes are
   * serialized independently of any DOM element.
   */
  setProperties(
    _el: Element,
    attributes: AnyObject,
    _shouldValidateInitialValue?: boolean,
  ): void {
    // No-op in SSR — properties are serialized directly in create().
    // This method exists to satisfy the ElementFactoryPort interface.
    // In the DOM implementation, this mutates a live element.
    // In SSR, attribute serialization happens inline during string building.
  }

  /**
   * Serializes an attributes object into an HTML attribute string.
   * This is the SSR equivalent of the DOM setProperties — it produces
   * the serialized form instead of mutating a live element.
   */
  serializeAttributes(attrs: Record<string, unknown>): string {
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
        parts.push(` ${key}="${escapeAttr(value.toString())}"`);
        continue;
      }
      parts.push(` ${key}="${escapeAttr(String(value))}"`);
    }
    return parts.join("");
  }

  /**
   * Renders children to an HTML string.
   * Handles strings, numbers, arrays, null/undefined/boolean (ignored).
   */
  renderChildren(children: unknown): string {
    if (children == null || typeof children === "boolean") return "";
    if (typeof children === "string") return escapeHtml(children);
    if (typeof children === "number") return String(children);
    if (Array.isArray(children))
      return children.map((c) => this.renderChildren(c)).join("");
    // Already rendered JSX (string from nested jsx/create calls)
    return String(children);
  }

  /**
   * Creates an HTML string from a JSX element.
   *
   * Handles:
   * - Primitives (string, number, boolean, null, undefined) -> text content
   * - Arrays -> concatenated children
   * - Function components -> called with props and this factory
   * - Fragment elements (null/undefined tag) -> rendered children
   * - String tags -> HTML element with serialized attributes and children
   * - Void elements -> self-closing tag
   */
  create<T = string>(jsx: NodeSingleJSXElement): T {
    // Primitives
    if (jsx == null || typeof jsx === "boolean") return "" as T;
    if (typeof jsx === "string") return escapeHtml(jsx) as T;
    if (typeof jsx === "number") return String(jsx) as T;

    // Arrays
    if (Array.isArray(jsx))
      return jsx.map((child) => this.create(child)).join("") as T;

    // JSX element descriptors
    const { jsxTag, attrs } = jsx;

    // Function component
    if (typeof jsxTag === "function") {
      return jsxTag(attrs, this) as T;
    }

    // Fragment — just render children
    if (jsxTag === null || jsxTag === undefined) {
      return this.renderChildren(attrs.children) as T;
    }

    // String tag — HTML element
    const attrStr = this.serializeAttributes(attrs);

    // Void element — self-closing, no children
    if (VOID_ELEMENTS.has(jsxTag)) {
      return `<${jsxTag}${attrStr}>` as T;
    }

    const childrenStr = this.renderChildren(attrs.children);
    return `<${jsxTag}${attrStr}>${childrenStr}</${jsxTag}>` as T;
  }
}
