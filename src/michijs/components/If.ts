import { create } from "../DOMDiff";
import { bindObservable } from "../hooks/bindObservable";
import { isChildNode } from "../typeWards/isChildNode";
import { CreateOptions, GetElementProps, ObservableLike, SingleJSXElement } from "../types";

type IfProps<T> = {
  as?: T,
  condition: Partial<ObservableLike<unknown>>,
  then?(): JSX.Element,
  else?(): JSX.Element
} & Omit<GetElementProps<T>, "children">

export const If = <const T = 'div'>({ as: asTag, condition, then, else: elseComponent, ...attrs }: IfProps<T>, options: CreateOptions) => {
  const el = create({
    tag: asTag ?? 'div',
    attrs
  } as SingleJSXElement) as Element

  if (asTag && !isChildNode(el))
    throw `Value ${asTag} is not valid as "If" tag`

  bindObservable(condition, (newValue) => {
    el.innerHTML = '';
    if (newValue) {
      if (then)
        el.append(create(then(), options))
    } else
      if (elseComponent)
        el.append(create(elseComponent(), options))
  })
  return el;
}