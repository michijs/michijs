import type { CSSProperties } from "../../generated/htmlType";
import { setStyleProperty } from "./setStyleProperty";
import { formatToKebabCase } from "../../utils";
import { bindObservable } from "../../utils";

export function setStyle(
  element: Element | HTMLElement,
  cssObject: CSSProperties,
) {
  if (cssObject && "style" in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      const formattedKey = formatToKebabCase(key);
      // Manual Update is faster than Object.assign
      bindObservable(value, (newValue) =>
        setStyleProperty(element, formattedKey, newValue),
      );
    });
  }
}
