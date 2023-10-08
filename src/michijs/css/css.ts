import { useStringTemplate } from "../hooks/useStringTemplate";
import { ObservableType } from "../types";
import { bindObservable } from "../utils";

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export function css(
  cssObject: TemplateStringsArray,
  ...props: (ObservableType<string | number> | string | number)[]
) {
  const template = useStringTemplate(cssObject, ...props);
  const styleSheet = new CSSStyleSheet();
  bindObservable(template, (newValue) => {
    styleSheet.replaceSync(newValue);
  })
  return styleSheet;
};
