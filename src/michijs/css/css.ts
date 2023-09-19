import { isObservableType } from "../typeWards/isObservableType";
import { ObservableType } from "../types";

/**
 * Allows to create a Constructable Stylesheet with a Template String.
 * Recomended extension for VSCode:
 * @link https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js
 */
export const css = (
  cssObject: TemplateStringsArray,
  ...props: (ObservableType<string | number> | string | number)[]
) => {
  const getCss = () => {
    return cssObject.raw.reduce((previousValue, currentValue, i) => {
      return `${previousValue}${currentValue}${props[i]?.valueOf() ?? ''}`;
      // The accumulator takes the first value if you don't pass a value as the second argument:
    }, "")
  }
  const styleSheet = new CSSStyleSheet();
  const updateStyleSheetCallback = () => styleSheet.replaceSync(getCss());
  styleSheet.replaceSync(getCss());
  props.forEach(x => {
    if (isObservableType(x))
      x.subscribe?.(updateStyleSheetCallback)
  })
  return styleSheet;
};
