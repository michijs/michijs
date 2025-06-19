import { create } from "../DOM/create/create";
import { bindObservable } from "../utils/bindObservable";
import type {
  SingleJSXElement,
  CSSVar,
  GetElementProps,
  Unproxify,
} from "../types";
import { VirtualFragment } from "../classes/VirtualFragment";
import { isCSSVariable } from "../typeWards/isCSSVariable";
import { useComputedObserve } from "../hooks";

interface CSSIfType {
  (
    condition: CSSVar<string>,
    values: [any, any][],
    elseValue?: any,
    options?: never,
  ): string;
}
interface JSIfType {
  <const T, const V>(
    condition: V,
    values: [Unproxify<V>, JSX.Element][] | JSX.Element,
    elseValue?: JSX.Element,
    options?: {
      /** Allows to caché components. */
      enableCache?: boolean;
      as?: T;
      attrs?: GetElementProps<T>;
    },
  ): JSX.Element;
}
export interface IfType extends CSSIfType, JSIfType {}
export interface IfType extends CSSIfType, JSIfType {}

/**
 * Converts conditional logic into a CSS-style string. Used when the condition is a CSSVar<string>.
 */
const cssIf: CSSIfType = (condition, values, elseValue) => {
  const valuesMap = new Map(values);
  const result = Array.from(valuesMap.entries()).map(
    ([key, value]) => `style(${condition}:${key}):${value}`,
  );
  if (elseValue) result.push(`else:${elseValue}`);

  return `if(${result.join(";")})`;
};

/**
 * Creates a dynamic and reactive DOM element or fragment based on observable condition. Caches DOM fragments if enableCache is true.
 */
const jsIf: JSIfType = (
  condition,
  values,
  elseValue,
  { as: asTag, enableCache, attrs } = {},
) => ({
  attrs: {},
  jsxTag(_, contextElement, contextNamespace) {
    const isSwitchMode = Array.isArray(values);
    const valuesMap = new Map<unknown, JSX.Element>(
      // @ts-ignore
      isSwitchMode ? values : [[true, values]],
    );
    const cacheMap = new Map<unknown, DocumentFragment>();
    let cachedElse: DocumentFragment | undefined;
    // Create an element or a virtual fragment depending on the 'asTag' prop.
    const el = asTag
      ? create<ParentNode>({
          jsxTag: asTag,
          attrs: attrs ?? {},
        } as SingleJSXElement)
      : new VirtualFragment();

    let oldMapValue: unknown | undefined;
    let oldJsx: unknown | undefined;
    let isFirstRender = true;

    const finalCondition = isSwitchMode
      ? condition
      : useComputedObserve(() => Boolean(condition?.valueOf()), [condition], {
          usePrimitive: true,
        });

    // Bind the observable 'condition' to monitor changes.
    bindObservable<unknown>(finalCondition, (newValue) => {
      let cacheFound: DocumentFragment | undefined;
      const jsxFoundOnMap = valuesMap.get(newValue);
      const jsx = jsxFoundOnMap ?? elseValue;

      if (jsx !== oldJsx) {
        if (enableCache) {
          if (!isFirstRender) {
            cacheFound = jsxFoundOnMap ? cacheMap.get(newValue) : cachedElse;
            const fragment = new DocumentFragment();
            fragment.append(...Array.from(el.childNodes));
            if (oldJsx === elseValue) cachedElse = fragment;
            else cacheMap.set(oldMapValue, fragment);
          }
          oldMapValue = newValue;
        }
        const newChildren: Node = cacheFound
          ? cacheFound
          : create(jsx, contextElement, contextNamespace);
        el.replaceChildren(newChildren);
        oldJsx = jsx;
        isFirstRender = false;
      }
    });

    return el.valueOf() as ParentNode;
  },
});

/**
 * Conditional rendering function. This is the only way to do it dynamically.
 * @returns A conditional JSX element (reactive) or a CSS conditional string.
 */
// @ts-ignore
export const If: IfType = (condition, values, elseValue, options) => {
  return isCSSVariable(condition)
    ? cssIf(condition, values, elseValue)
    : jsIf(condition, values, elseValue, options);
};
