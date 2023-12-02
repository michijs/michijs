import { CreateOptions, GetElementProps } from "../types";
import { setProperties } from "./attributes/setProperties";

export function createElement<
  const T extends string,
  A extends GetElementProps<T> | JSX.IntrinsicElements["div"],
  E extends T extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[T]
    : T extends keyof SVGElementTagNameMap
      ? SVGElementTagNameMap[T]
      : HTMLElement,
>(
  tagName: T,
  attributes?: A,
  options?: ElementCreationOptions & CreateOptions,
) {
  const el = document.createElement(tagName, options);
  if (attributes) setProperties(el, attributes, options);

  return el as unknown as E & ((props?: A) => E);
}
