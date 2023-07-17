import { FC, ObservableLike } from "../types";
import { create } from '../DOMDiff'

interface IfProps {
  condition: Partial<ObservableLike<boolean>>,
  then(): JSX.Element,
  else?(): JSX.Element
}

export const If: FC<IfProps> = (props) => {
  const getCurrentElement = (value) => create(value ? props.then() : props.else?.()) ?? document.createComment('')
  let el = getCurrentElement(props.condition.valueOf()) as Element;

  props.condition.subscribe?.((newValue) => {
    const newEl = getCurrentElement(newValue);
    el.replaceWith(newEl);
    el = newEl as Element;
  })

  return { tag: el, attrs: { children: [] } };
}