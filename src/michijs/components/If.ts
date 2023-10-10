import { create } from "../DOMDiff";
import { VirtualFragment } from "../classes";
import { bindObservable } from "../utils";
import {
  CreateOptions,
  ExtendableComponentWithoutChildren,
  FC,
  ObservableLike,
  SingleJSXElement,
} from "../types";

type IfProps<T> = ExtendableComponentWithoutChildren<T> & {
  condition: ObservableLike<any>;
  then?: JSX.Element;
  else?: JSX.Element;
};

export const If = <const T = FC>(
  { as: asTag, condition, then, else: elseComponent, ...attrs }: IfProps<T>,
  options: CreateOptions,
) => {
  const el = asTag
    ? (create({
      jsxTag: asTag,
      attrs,
    } as unknown as SingleJSXElement) as ChildNode & ParentNode)
    : new VirtualFragment();

  let cachedThen: DocumentFragment | undefined;
  let cachedElse: DocumentFragment | undefined;

  bindObservable(condition, (newValue) => {
    const newCache = Array.from(el.childNodes);
    if (newValue) {
      const fragment = new DocumentFragment();
      fragment.append(...newCache)
      cachedElse = fragment;
      if (cachedThen) el.replaceChildren(cachedThen);
      else if (then) el.replaceChildren(create(then, options));
    } else {
      const fragment = new DocumentFragment();
      fragment.append(...newCache)
      cachedThen = fragment;
      if (cachedElse) el.replaceChildren(cachedElse);
      else if (elseComponent)
        el.replaceChildren(create(elseComponent, options));
    }
  });
  return el.valueOf() as Node;
};
