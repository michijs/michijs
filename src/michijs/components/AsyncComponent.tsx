import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes/VirtualFragment";
import { CreateOptions, FC, GetElementProps, SingleJSXElement } from "../types";

type AsyncComponentProps<T> = {
  as?: T;
  promise: Promise<JSX.Element> | (() => Promise<JSX.Element>) | (() => Promise<{ default: JSX.Element }>);
  loadingComponent?: JSX.Element;
} & Omit<GetElementProps<T>, "children">;

export const AsyncComponent = <const T = FC>(
  { as: asTag, promise, loadingComponent, ...attrs }: AsyncComponentProps<T>,
  options: CreateOptions,
) => {
  let el = asTag
    ? (create({
      tag: asTag,
      attrs,
    } as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();
  el.append(create(loadingComponent, options));

  const render = (promiseResult: JSX.Element | { default: JSX.Element }) => {
    const oldEl = el;
    el = create((promiseResult as { default: JSX.Element }).default ?? promiseResult, options) as ChildNode & ParentNode;
    oldEl.replaceWith(el);
  };

  (typeof promise === 'function' ? promise() : promise).then(render).catch(render);

  return el.valueOf();
};
