/**
 * Node.js JSX runtime for server-side rendering.
 * Delegates to NodeElementFactory for HTML string production.
 */
import { NodeElementFactory } from "../rendering/NodeElementFactory";

const factory = new NodeElementFactory();

/**
 * JSX factory function for Node.js server-side rendering.
 * Produces HTML strings.
 *
 * @param tag - Either a string tag name (e.g. "div") or a function component.
 * @param attrs - The attributes/props object, including `children`.
 * @returns An HTML string.
 */
function jsx(
  tag:
    | string
    | ((props: Record<string, unknown>, factory: NodeElementFactory) => string)
    | null
    | undefined,
  attrs: Record<string, unknown> = {},
): string {
  return factory.create({ jsxTag: tag as any, attrs });
}

/**
 * Fragment sentinel for the Node JSX runtime.
 * When used as a JSX tag, children are concatenated without a wrapper element.
 */
// biome-ignore lint: Fragment is intentionally null cast
const Fragment = null as unknown as () => null;

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
