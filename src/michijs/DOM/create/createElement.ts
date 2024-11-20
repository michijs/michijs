import { createObject } from "./createObject";
import type { GetElementProps } from "../../types";

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
  {
    is,
    contextElement,
    contextNamespace
  }: ElementCreationOptions & {
    contextElement?: Element;
    contextNamespace?: string;
  } = {},
) {
  const el = createObject(
    {
      jsxTag: tagName,
      attrs: {
        ...(attributes ?? {}),
        is,
      },
    },
    contextElement,
    contextNamespace,
  );

  return el as unknown as E & ((props?: A) => E);
}
