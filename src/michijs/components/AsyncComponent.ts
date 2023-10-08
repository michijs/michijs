import { create } from "../DOMDiff";
import { jsx } from "../h";
import { VirtualFragment } from "../classes";
import {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  FC,
  SingleJSXElement,
} from "../types";

type PromiseReturnType = JSX.Element | FC | (new (...args: any[]) => Element);

type AsyncComponentProps<T> = ExtendableComponentWithoutChildren<T> & {
  promise:
    | Promise<PromiseReturnType>
    | (() => Promise<PromiseReturnType>)
    | (() => Promise<{ default: PromiseReturnType }>);
  loadingComponent?: JSX.Element;
};

export const AsyncComponent = <const T = FC>(
  { as: asTag, promise, loadingComponent, ...attrs }: AsyncComponentProps<T>,
  options: CreateOptions,
) => {
  let el = asTag
    ? (create({
        jsxTag: asTag,
        attrs,
      } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();

  if (loadingComponent) el.append(create(loadingComponent, options));

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

    el = create(
      Res && typeof Res === "function" ? jsx(Res) : Res,
      options,
    ) as ChildNode & ParentNode;
    oldEl.replaceWith(el);
  };

  (typeof promise === "function" ? promise() : promise).then(render);

  return el.valueOf() as Node;
};
