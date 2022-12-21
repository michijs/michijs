import { createStyleSheet } from ".";
import { CSSObject } from "../types";
import { cssVariablesFromCssObject } from "./cssVariablesFromCssObject";

export function createCssVariables<T extends CSSObject>(selector: string | string[], cssObject: T): CSSStyleSheet {
  return createStyleSheet(cssVariablesFromCssObject(cssObject), typeof selector === 'string' ? [selector]: selector);
}