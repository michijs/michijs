import { CSSProperties } from '@lsegurado/htmltype/Attributes';
import { AdoptedStyle } from '../components/AdoptedStyle';
import { supportsAdoptingStyleSheets } from '../components/AdoptedStyle/supportsAdoptingStyleSheets';
import { LSCustomElement, ObjectJSXElement } from '../types';
import { isAFunction } from '../typeWards/IsAFunction';
import { deepEqual } from '../utils/deepEqual';
import { getAttribute } from '../utils/getAttribute';
import { setAttributeValue } from '../utils/setAttributeValue';
import { addRule } from '../inlineCSS/addRule';
import { isALSCustomElement } from '../typeWards/isALSCustomElement';

export function setAttributes(self: LSCustomElement | DocumentFragment, currentElement: HTMLElement, attrs: ObjectJSXElement['attrs'], isUpdate: boolean) {
  if (attrs) {
    const attributesNames: string[] = isUpdate ? attrs._dynamicAttributes || Object.keys(attrs) : Object.keys(attrs);
    attributesNames.forEach(name => {
      const newValue = attrs[name];
      if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
        setEventListener(self, currentElement, name, newValue, isUpdate);
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

function setEventListener(self: LSCustomElement | DocumentFragment, currentElement: HTMLElement, name: string, event: EventListener, isUpdate: boolean) {
  const needsToBeBinded = isALSCustomElement(self) && !isArrowFunction(event);
  const finalEvent = needsToBeBinded ? event.bind(self) : event;
  if (isUpdate) {
    if (!deepEqual(currentElement[name], finalEvent)) {
      currentElement[name] = finalEvent;
    }
  } else {
    currentElement[name] = finalEvent;
  }
}

function isArrowFunction(arrowFunction: Function) {
  return arrowFunction.toString().startsWith('(');
}

function setAttribute(element: Element, name: string, value: any) {
  if (name.startsWith('_')) {
    const key = name.substr(1);
    element[key] = value;
  } else {
    setAttributeValue(element, name, value);
  }
}

function setStyle(self: LSCustomElement | DocumentFragment, element: HTMLElement, styleValue: CSSProperties, id: string) {
  if (supportsAdoptingStyleSheets && isALSCustomElement(self)) {
    const newStyleSheet = new CSSStyleSheet();
    addRule(newStyleSheet, `#${id}`, styleValue);
    AdoptedStyle({ id: self.id }, [newStyleSheet], self);
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
