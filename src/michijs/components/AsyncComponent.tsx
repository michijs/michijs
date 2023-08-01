import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes/VirtualFragment";
import { CreateOptions, FC, GetElementProps, SingleJSXElement } from "../types";

type AsyncComponentProps<J, T> = {
  as?: T,
  promise: Promise<J>,
  render?(promiseResult: J): JSX.Element,
  renderError?(reson: any): JSX.Element,
  loadingComponent?: JSX.Element
} & Omit<GetElementProps<T>, "children">

export const AsyncComponent = <J extends unknown, const T = FC>({ as: asTag, promise, render, renderError, loadingComponent, ...attrs }: AsyncComponentProps<J, T>, options: CreateOptions) => {
  let el = asTag ? create({
    tag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment();
  el.append(create(loadingComponent, options))

  promise.then(promiseResult => {
    const oldEl = el;
    el = create(render?.(promiseResult) ?? promiseResult, options) as (ChildNode & ParentNode);
    oldEl.replaceWith(el)
  }).catch((reason) => {
    if (renderError) {
      const oldEl = el;
      el = create(renderError(reason), options) as (ChildNode & ParentNode);
      oldEl.replaceWith(el)
    }
  })

  return el.valueOf();
}