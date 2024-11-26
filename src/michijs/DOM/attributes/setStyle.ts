import type { CSSProperties } from "../../generated/htmlType";
import { setStyleProperty } from "./setStyleProperty";
import { formatToKebabCase } from "../../utils/formatToKebabCase";
import { bindObservableToRef } from "../../utils/bindObservableToRef";

export function setStyle(
  element: Element | HTMLElement,
  cssObject: CSSProperties,
): void {
  if (cssObject && "style" in element)
    for (const [key, value] of Object.entries(cssObject)) {
      const formattedKey = formatToKebabCase(key);
      // Manual Update is faster than Object.assign
      bindObservableToRef(value, element, (newValue, element) =>
        setStyleProperty(element, formattedKey, newValue),
      );
    };
}
