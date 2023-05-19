import { setAttributes } from "./attributes/setAttributes";

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
  options?: ElementCreationOptions,
) {
  const el = document.createElement(tagName, options);
  if (attributes) setAttributes(el, attributes);

  return el as unknown as E & (new (props?: JSX.IntrinsicElements[T]) => E);
}
