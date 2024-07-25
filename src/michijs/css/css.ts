import { useStringTemplate } from "../hooks/useStringTemplate";
import type { ObservableType } from "../types";
import { bindObservableToRef } from "../utils/bindObservableToRef";

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export function css(
  cssObject: TemplateStringsArray,
  ...props: (ObservableType<string | number> | string | number)[]
): CSSStyleSheet {
  const template = useStringTemplate(cssObject, ...props);
  const styleSheet = new CSSStyleSheet();
  bindObservableToRef(template, styleSheet, (newValue, styleSheet) => {
    // Jest fix
    if (styleSheet.replaceSync) styleSheet.replaceSync(newValue);
  });
  return styleSheet;
}
