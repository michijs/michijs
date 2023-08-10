import type { CSSProperties } from "@michijs/htmltype";
import { setStyleProperty } from "./setStyleProperty";
import { formatToKebabCase } from "../../utils";
import { bindObservable } from "../../hooks/bindObservable";

export function setStyle(
  element: Element | HTMLElement,
  cssObject: CSSProperties,
) {
  // if (supportsAdoptingStyleSheets && self) {
  //   AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
  // } else {
  if (cssObject && "style" in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      const formattedKey = formatToKebabCase(key);
      // Manual Update is faster than Object.assign
      bindObservable(value, (newValue) =>
        setStyleProperty(element, formattedKey, newValue),
      );
    });
  }
  // TODO: check if its possible
  // else {
  //   setAttribute(element, "style", cssObject);
  // }
  // }
}
