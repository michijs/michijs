import { create } from "../DOMDiff/create";
import { bindObservable } from "../utils/bindObservable";
import type {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  CreateFCResult,
  SingleJSXElement,
} from "../types";
import { useComputedObserve } from "../hooks/useComputedObserve";
import { VirtualFragment } from "../classes/VirtualFragment";
import { ProxiedValue } from "../classes/ProxiedValue";

type IfProps<T> = ExtendableComponentWithoutChildren<T> & {
  /** The condition to evaluate for rendering content. */
  condition: any;
  /** The content to render when the condition is truthy. */
  then?: JSX.Element | (() => JSX.Element);
  /** The content to render when the condition is falsy. */
  else?: JSX.Element | (() => JSX.Element);
  /** Allows to caché then / else components. */
  enableCache?: boolean;
};

/**
 * Conditional rendering component. This is the only way to do it dynamically.
 */
export const If = <const T = CreateFCResult>(
  {
    as: asTag,
    condition,
    then,
    else: elseComponent,
    enableCache,
    ...attrs
  }: IfProps<T>,
  options: CreateOptions,
) => {
  // Create an element or a virtual fragment depending on the 'asTag' prop.
  const el = asTag
    ? (create({
        jsxTag: asTag,
        attrs,
      } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();

  let cachedThen: DocumentFragment | undefined;
  let cachedElse: DocumentFragment | undefined;

  const conditionAsBoolean = useComputedObserve(
    () =>
      condition instanceof ProxiedValue ? condition.toBoolean() : condition,
    [condition],
  );

  // Bind the observable 'condition' to monitor changes.
  bindObservable(conditionAsBoolean, (newValue) => {
    const newCache = el.childNodes.length
      ? Array.from(el.childNodes)
      : undefined;
    if (newValue) {
      if (newCache) {
        const fragment = new DocumentFragment();
        fragment.append(...newCache);
        if (enableCache) cachedElse = fragment;
      }
      if (cachedThen) el.replaceChildren(cachedThen);
      else if (then)
        el.replaceChildren(
          create(typeof then === "function" ? then() : then, options),
        );
    } else {
      if (newCache) {
        const fragment = new DocumentFragment();
        fragment.append(...newCache);
        if (enableCache) cachedThen = fragment;
      }
      if (cachedElse) el.replaceChildren(cachedElse);
      else if (elseComponent)
        el.replaceChildren(
          create(
            typeof elseComponent === "function"
              ? elseComponent()
              : elseComponent,
            options,
          ),
        );
    }
  });

  // Return the rendered element.
  return el.valueOf() as Node;
};
