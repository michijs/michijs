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
  condition: ObservableLike<unknown>;
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

  let cachedThen: Node[] | undefined;
  let cachedElse: Node[] | undefined;

  bindObservable(condition, (newValue) => {
    const newCache =
      el.childNodes.length > 0 ? Array.from(el.childNodes) : undefined;
    if (newValue) {
      cachedElse = newCache;
      if (cachedThen) el.replaceChildren(...cachedThen);
      else if (then) el.replaceChildren(create(then, options));
    } else {
      cachedThen = newCache;
      if (cachedElse) el.replaceChildren(...cachedElse);
      else if (elseComponent) el.replaceChildren(create(elseComponent, options));
    }
  });
  return el.valueOf() as Node;
};
