import { Attributes } from '@michijs/htmltype';
import { setAttribute } from './setAttribute';
import { setStyleProperty } from './setStyleProperty';

export function setStyle(element: Element | HTMLElement, cssObject: Attributes.CSSProperties) {
  // if (supportsAdoptingStyleSheets && self) {
  //   AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
  // } else {
  element.removeAttribute('style');
  if (cssObject && 'style' in element) {
    Object.entries(cssObject).forEach(([key, value]) => {
      // Manual Update is faster than Object.assign	
      setStyleProperty(element, key, value);
    });
  } else {
    setAttribute(element, 'style', cssObject);
  }
  // }
}