import { Attributes } from '@lsegurado/htmltype';
import { elementIsHTMLElement } from '../../typeWards/elementIsHTMLElement';
import { setAttribute } from './setAttribute';

export function setStyle(element: Element | HTMLElement, cssObject: Attributes.CSSProperties) {
  // if (supportsAdoptingStyleSheets && self) {
  //   AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
  // } else {
  element.removeAttribute('style');
  if (cssObject && elementIsHTMLElement(element)) {
    Object.entries(cssObject).forEach(([key, value]) => {
      // Manual Update is faster than Object.assign	
      (element as HTMLElement).style[key] = value;
    });
  } else {
    setAttribute(element, 'style', cssObject);
  }
  // }
}