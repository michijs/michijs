import { createObject } from "../DOMDiff/createObject";
import type { CreateOptions, GetElementProps } from "../types";

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
  { is, ...options }: ElementCreationOptions & CreateOptions = {},
) {
  const el = createObject(
    {
      jsxTag: tagName,
      attrs: {
        ...(attributes ?? {}),
        is,
      },
    },
    options,
  );

  return el as unknown as E & ((props?: A) => E);
}
