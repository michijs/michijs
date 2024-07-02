import { setStyleProperty } from "./setStyleProperty";
import { bindObservableToRef, formatToKebabCase } from "../../utils";

/**
 * @typedef {import('../../generated/htmlType').CSSProperties} CSSProperties
 */

/**
 * @param {Element | HTMLElement} element
 * @param {CSSProperties} cssObject
 */
export function setStyle(element, cssObject) {
  if (cssObject && "style" in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      const formattedKey = formatToKebabCase(key);
      // Manual Update is faster than Object.assign
      bindObservableToRef(value, element, (newValue, element) =>
        setStyleProperty(element, formattedKey, newValue),
      );
    });
  }
}
