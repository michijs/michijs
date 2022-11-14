import { createStyleSheet } from ".";
import { CSSObject, StringObjectOf } from "../types";
import { valueIsCSSObject } from "../typeWards/valueIsCSSObject";
import { formatToKebabCase } from "../utils";
import { cssVariablesFromCssObject } from "./cssVariablesFromCssObject";

const fakeCSSObject = (parent: string, target: CSSObject) => new Proxy(target, {
  get(t, p: string) {
    const property = t[p];
    if (valueIsCSSObject(property))
      return fakeCSSObject(`${parent}-${formatToKebabCase(p.toString())}`, property)
    else
      return `var(${parent}-${formatToKebabCase(p.toString())})`
  }
})

export function declareCssVariables<T extends CSSObject>(selector: string, cssObject: T): [CSSStyleSheet, StringObjectOf<T>] {
  const styleSheet = createStyleSheet({
    [selector]: cssVariablesFromCssObject(cssObject)
  });

  return [styleSheet, fakeCSSObject('-', cssObject)]
}