import { createStyleSheet } from ".";
import { CSSObject } from "../types";
import { cssVariablesFromCssObject } from "./cssVariablesFromCssObject";

export function createCssVariables<T extends CSSObject>(selector: string, cssObject: T): CSSStyleSheet {
  const styleSheet = createStyleSheet({
    [selector]: cssVariablesFromCssObject(cssObject)
  });

  return styleSheet
}