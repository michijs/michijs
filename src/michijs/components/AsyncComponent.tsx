import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes";
import { h } from "../h";
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
      jsxTag: asTag,
      attrs,
    } as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();

  if (loadingComponent)
    el.append(create(loadingComponent, options));

  const render = (promiseResult: JSX.Element | { default: JSX.Element }) => {
    const oldEl = el;
    const Res = (promiseResult as { default: JSX.Element }).default ?? promiseResult ?? null;

    el = create(typeof Res === "object" &&
      Res && "jsxTag" in Res ? Res : <Res />, options) as ChildNode & ParentNode;
    oldEl.replaceWith(el);
  };

  (typeof promise === 'function' ? promise() : promise).then(render).catch(render);

  return el.valueOf();
};
