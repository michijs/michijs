import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes/VirtualFragment";
import { bindObservable } from "../hooks/bindObservable";
import { CreateOptions, ExtendableComponentWithoutChildren, FC, ObservableLike, SingleJSXElement } from "../types";

type IfProps<T> = ExtendableComponentWithoutChildren<T> & {
  condition: Partial<ObservableLike<unknown>>,
  then?: JSX.Element,
  else?: JSX.Element
}

export const If = <const T = FC>({ as: asTag, condition, then, else: elseComponent, ...attrs }: IfProps<T>, options: CreateOptions) => {
  const el = asTag ? create({
    tag: asTag,
    attrs
  } as SingleJSXElement) as ChildNode & ParentNode : new VirtualFragment();

  let cachedThen: Node[] | undefined;
  let cachedElse: Node[] | undefined;

  bindObservable(condition, (newValue) => {
    const newCache = el.childNodes.length > 0 ? Array.from(el.childNodes) : undefined
    el.textContent = '';
    if (newValue) {
      cachedElse = newCache;
      if (cachedThen)
        el.append(...cachedThen)
      else if (then)
        el.append(create(then, options))
    } else {
      cachedThen = newCache;
      if (cachedElse)
        el.append(...cachedElse)
      else if (elseComponent)
        el.append(create(elseComponent, options));
    }
  })
  return el.valueOf();
}