import { CreateOptions } from "../types";
import { setProperties } from "./attributes/setProperties";

export function createElement<
  T extends keyof JSX.IntrinsicElements,
  E extends T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : T extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[T]
    : HTMLElement,
>(
  tagName: T,
  attributes?: JSX.IntrinsicElements[T],
  options?: ElementCreationOptions & CreateOptions,
) {
  const el = document.createElement(tagName, options);
  if (attributes) setProperties(el, attributes, options);

  return el as unknown as E & (new (props?: JSX.IntrinsicElements[T]) => E);
}
