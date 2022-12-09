import { Attributes } from '@lsegurado/htmltype';
import { setAttribute } from './setAttribute';

export function setStyle(element: Element | HTMLElement, cssObject: Attributes.CSSProperties) {
  // if (supportsAdoptingStyleSheets && self) {
  //   AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
  // } else {
  element.removeAttribute('style');
  if (cssObject && 'style' in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      // Manual Update is faster than Object.assign	
      element.style[key] = value
    });
  } else {
    setAttribute(element, 'style', cssObject);
  }
  // }
}