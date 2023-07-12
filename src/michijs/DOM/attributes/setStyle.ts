import type { CSSProperties } from "@michijs/htmltype";
import { setAttribute } from "./setAttribute";
import { setStyleProperty } from "./setStyleProperty";

export function setStyle(
  element: Element | HTMLElement,
  cssObject: CSSProperties,
) {
  // if (supportsAdoptingStyleSheets && self) {
  //   AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
  // } else {
  element.removeAttribute("style");
  if (cssObject && "style" in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      // Manual Update is faster than Object.assign
      setStyleProperty(element, key, value);
      if (value.subscribe)
        value.subscribe((newValue) => setStyleProperty(element, key, newValue));
    });
  }
  // TODO: check if its possible
  // else {
  //   setAttribute(element, "style", cssObject);
  // }
  // }
}
