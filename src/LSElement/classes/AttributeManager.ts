import type { CSSProperties } from '@lsegurado/htmltype/Attributes';
import { AdoptedStyle } from '../components/AdoptedStyle';
import { supportsAdoptingStyleSheets } from '../components/AdoptedStyle/supportsAdoptingStyleSheets';
import type { LSCustomElement, ObjectJSXElement } from '../types';
import { isAFunction } from '../typeWards/IsAFunction';
import { deepEqual } from '../utils/deepEqual';
import { addRule } from '../inlineCSS/addRule';
import { formatToKebabCase } from '../utils/formatToKebabCase';
import { elementIsHTMLElement } from '../typeWards/elementIsHTMLElement';
import { isArrowFunction } from '../utils/isArrowFunction';

export abstract class AttributeManager {
  static setAttributes(self: LSCustomElement | null, element: Element, attrs: ObjectJSXElement['attrs'], isUpdate: boolean) {
    if (attrs) {
      const attributesNames: string[] = isUpdate ? attrs._dynamicAttributes || Object.keys(attrs) : Object.keys(attrs);
      attributesNames.forEach(name => {
        const newValue = attrs[name];
        if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
          this.setEventListener(self, name, newValue, element, isUpdate);
        } else if (name === 'style') {
          this.setStyle(self, element, newValue, attrs['id']);
        } else {
          this.setAttributeOrProperty(element, name, isUpdate, newValue);
        }
      });
    }
  }
  static setEventListener(self: LSCustomElement | null, name: string, event: EventListener, element: Element, isUpdate: boolean) {
    const needsToBeBinded = self && !isArrowFunction(event);
    const finalEvent = needsToBeBinded ? event.bind(self) : event;
    if (isUpdate) {
      if (!deepEqual(element[name], finalEvent)) {
        element[name] = finalEvent;
      }
    } else {
      element[name] = finalEvent;
    }
  }
  static setAttributeOrProperty(element: Element | HTMLElement, name: string, isUpdate: boolean, value: any) {
    if (name.startsWith('_')) {
      const propertyName = name.substr(1);
      this.setProperty(element, isUpdate, propertyName, value);
    } else {
      this.setAttribute(element, isUpdate, name, value);
    }
  }
  static setAttribute(element: Element | HTMLElement, isUpdate: boolean, name: string, value: any) {
    if (isUpdate) {
      if (!deepEqual(value, this.getAttribute(element, name))) {
        this.setAttributeValue(element, name, value);
      }
    } else {
      this.setAttributeValue(element, name, value);
    }
  }
  static getAttribute(element: Element, name: string) {
    return this.getAttributeValue(element.getAttribute(name));
  }
  static setProperty(element: Element, isUpdate: boolean, name: string, newValue: any) {
    if (isUpdate) {
      if (!deepEqual(element[name], newValue)) {
        element[name] = newValue;
      }
    } else {
      element[name] = newValue;
    }
  }
  static setStyle(self: LSCustomElement | null, element: Element | HTMLElement, styleValue: CSSProperties, id: string) {
    if (supportsAdoptingStyleSheets && self) {
      const newStyleSheet = new CSSStyleSheet();
      addRule(newStyleSheet, `#${id}`, styleValue);
      AdoptedStyle({ id: self.id }, [newStyleSheet], self);
    } else {
      element.removeAttribute('style');
      if (styleValue && elementIsHTMLElement(element)) {
        Object.entries(styleValue).forEach(([key, value]) => {
          // Manual Update is faster than Object.assign	
          (element as HTMLElement).style[key] = value;
        });
      } else {
        this.setAttributeValue(element, 'style', styleValue);
      }
    }
  }
  static setStandardAttribute(element: Element | HTMLElement, key: string, newValue: any) {
    const formattedKey = formatToKebabCase(key);
    this.setAttributeValue(element, formattedKey, newValue);
  }
  static setAttributeValue(element: Element | HTMLElement, key: string, newValue: any) {
    switch (true) {
      case newValue === null:
      case newValue === undefined:
      case typeof newValue === 'boolean': {
        if (newValue) {
          element.setAttribute(key, '');
        } else {
          element.removeAttribute(key);
        }
        break;
      }
      case typeof newValue === 'object': {
        element.setAttribute(key, JSON.stringify(newValue));
        break;
      }
      default: {
        element.setAttribute(key, newValue);
      }
    }
  }
  static getAttributeValue(value) {
    try {
      return JSON.parse(value);
    } catch {
      switch (true) {
        case value === '' || value === 'true': {
          return true;
        }
        case value === null: {
          return false;
        }
        default: {
          return value;
        }
      }
    }
  }
}

