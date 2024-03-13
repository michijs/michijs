import { create } from "../DOMDiff";
import { jsx } from "../h";
import { VirtualFragment } from "../classes";
import type {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  CreateFCResult,
  SingleJSXElement,
} from "../types";

// Define a type for the return value of promises, which can be a JSX element, a function component, or a DOM element.
type PromiseReturnType =
  | JSX.Element
  | CreateFCResult
  | (new (
      ...args: any[]
    ) => Element);

// Define props for the AsyncComponent.
type AsyncComponentProps<T> = ExtendableComponentWithoutChildren<T> & {
  // The promise that resolves to the component to render asynchronously.
  promise:
    | Promise<PromiseReturnType>
    | (() => Promise<PromiseReturnType>)
    | (() => Promise<{ default: PromiseReturnType }>);
  // An optional loading component to display while the async component is loading.
  loadingComponent?: JSX.Element;
};

/**
 * Asynchronously renders a component after the promise ends. In the meantime you can choose to show a load component or not show anything.
 */
export const AsyncComponent = <const T = CreateFCResult>(
  { as: asTag, promise, loadingComponent, ...attrs }: AsyncComponentProps<T>,
  options: CreateOptions,
) => {
  let el = asTag
    ? (create({
        jsxTag: asTag,
        attrs,
      } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();

  // If a loading component is provided, append it to the element.
  if (loadingComponent) el.append(create(loadingComponent, options));

  // Function to render the component when the promise resolves.
  const render = (
    promiseResult: PromiseReturnType | { default: PromiseReturnType },
  ) => {
    const oldEl = el;
    const Res: PromiseReturnType =
      promiseResult &&
      typeof promiseResult === "object" &&
      "default" in promiseResult
        ? promiseResult.default
        : promiseResult;

    // Create and replace the element with the resolved component.
    el = create(
      Res && typeof Res === "function" ? jsx(Res) : Res,
      options,
    ) as ChildNode & ParentNode;
    oldEl.replaceWith(el);
  };

  // Execute the promise and render the component when it resolves.
  (typeof promise === "function" ? promise() : promise).then(render);

  // Return the rendered element.
  return el.valueOf() as Node;
};
