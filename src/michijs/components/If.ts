import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../hooks/bindObservable";
import { CreateOptions, FC, GetElementProps, ObservableLike, SingleJSXElement } from "../types";

type IfProps<T> = {
  as?: T,
  condition: Partial<ObservableLike<unknown>>,
  then?(): JSX.Element,
  else?(): JSX.Element
} & Omit<GetElementProps<T>, "children">

export const If = <const T = FC>({ as: asTag, condition, then, else: elseComponent, ...attrs }: IfProps<T>, options: CreateOptions) => {
  const el = asTag ? create({
    tag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment()

  bindObservable(condition, (newValue) => {
    el.textContent = '';
    if (newValue) {
      if (then)
        el.append(create(then(), options))
    } else
      if (elseComponent)
        el.append(create(elseComponent(), options))
  })
  return el.valueOf();
}