import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes/VirtualFragment";
import { CreateOptions, FC, GetElementProps, SingleJSXElement } from "../types";

type AsyncComponentProps<J, T> = {
  as?: T,
  promise: Promise<JSX.Element>,
  loadingComponent?: JSX.Element
} & Omit<GetElementProps<T>, "children">

export const AsyncComponent = <J extends unknown, const T = FC>({ as: asTag, promise, loadingComponent, ...attrs }: AsyncComponentProps<J, T>, options: CreateOptions) => {
  let el = asTag ? create({
    tag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment();
  el.append(create(loadingComponent, options));

  const render = promiseResult => {
    const oldEl = el;
    el = create(promiseResult, options) as (ChildNode & ParentNode);
    oldEl.replaceWith(el)
  }

  promise.then(render).catch(render)

  return el.valueOf();
}