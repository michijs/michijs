import { CSSProperties } from '@lsegurado/htmltype/Attributes';
import { AdoptedStyle } from '../components/AdoptedStyle';
import { supportsAdoptingStyleSheets } from '../components/AdoptedStyle/supportsAdoptingStyleSheets';
import { ElementMap, LSCustomElement } from '../types';
import { isAFunction } from '../typeWards/IsAFunction';
import { deepEqual } from '../utils/deepEqual';
import { getAttribute } from '../utils/getAttribute';
import { setAttributeValue } from '../utils/setAttributeValue';
import { addRule } from '../inlineCSS/addRule';

export function setAttributes(self: LSCustomElement | null, currentElement: LSCustomElement, newElementMap: ElementMap, isUpdate: boolean) {
  const { attrs } = newElementMap;
  if (attrs) {
    const attributesNames: string[] = isUpdate ? attrs._dynamicAttributes || Object.keys(attrs) : Object.keys(attrs);
    attributesNames.forEach(name => {
      const newValue = attrs[name];
      if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
        if (!isUpdate) {
          if (self) {
            currentElement.addEventListener(name.substr(2), (...args) => newValue.apply(self, [...args]));
          } else {
            currentElement.addEventListener(name.substr(2), newValue);
          }
        }
      } else if (name === 'style') {
        setStyle(self, currentElement, newValue, attrs['id']);
      } else if (isUpdate) {
        const oldValue = getAttribute(currentElement, name);
        if (!deepEqual(newValue, oldValue)) {
          setAttribute(currentElement, name, newValue);
        }
      } else {
        setAttribute(currentElement, name, attrs[name]);
      }
    });
  }
}

function setAttribute(element: LSCustomElement, name: string, value: any) {
  if (name.startsWith('_')) {
    const key = name.substr(1);
    element[key] = value;
  } else {
    setAttributeValue(element, name, value);
  }
}

function setStyle(self: LSCustomElement | null, element: LSCustomElement, styleValue: CSSProperties, id: string) {
  if (self && supportsAdoptingStyleSheets) {
    const newStyleSheet = new CSSStyleSheet();
    addRule(newStyleSheet, `#${id}`, styleValue);
    AdoptedStyle({ parentRef: self, id: self.id }, [newStyleSheet]);
  } else {
    element.removeAttribute('style');
    if (styleValue) {
      Object.entries(styleValue).forEach(([key, value]) => {
        // Manual Update is faster than Object.assign	
        element.style[key] = value;
      });
    } else {
      setAttributeValue(element, 'style', styleValue);
    }
  }
}

