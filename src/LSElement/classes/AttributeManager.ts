import type { CSSProperties } from '@lsegurado/htmltype/Attributes';
import { AdoptedStyle } from '../components/AdoptedStyle';
import { supportsAdoptingStyleSheets } from '../css/supportsAdoptingStyleSheets';
import type { LSCustomElement, LSElement, ObjectJSXElement } from '../types';
import { isAFunction } from '../typeWards/IsAFunction';
import { deepEqual } from '../utils/deepEqual';
import { elementIsHTMLElement } from '../typeWards/elementIsHTMLElement';
import { isArrowFunction } from '../utils/isArrowFunction';
import { createStyleSheet } from '../css/createStyleSheet';

export abstract class AttributeManager {
  static setAttributes(self: LSCustomElement | null, element: LSElement, attrs: ObjectJSXElement['attrs'], isUpdate: boolean) {
    if (attrs) {
      const attributesNames: string[] = isUpdate ? attrs._dynamicAttributes ?? Object.keys(attrs) : Object.keys(attrs);
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
  static setEventListener(self: LSCustomElement | null, name: string, event: EventListener, element: LSElement, isUpdate: boolean) {
    const finalEvent = this.bindFunction(self, event);
    const finalEventName = name.slice(2);
    if (element.ls?.eventListeners) {
      const oldEventIndex = element.ls.eventListeners.findIndex(x => x.addedBy === self && x.eventName === finalEventName);
      if (isUpdate && oldEventIndex >= 0) {
        const oldEvent = element.ls.eventListeners[oldEventIndex]?.event;
        if (!deepEqual(oldEvent, finalEvent)) {
          element.removeEventListener(finalEventName, oldEvent);
          element.ls.eventListeners.splice(oldEventIndex, 1);
          element.addEventListener(finalEventName, finalEvent);
          element.ls.eventListeners.push({ addedBy: self, eventName: finalEventName, event: finalEvent });
        }
      } else {
        element.addEventListener(finalEventName, finalEvent);
        element.ls.eventListeners.push({ addedBy: self, eventName: finalEventName, event: finalEvent });
      }
    } else {
      element.ls = {
        ...element.ls,
        eventListeners: [{ addedBy: self, eventName: finalEventName, event: finalEvent }]
      };
      element.addEventListener(finalEventName, finalEvent);
    }
  }
  static bindFunction(self: LSCustomElement | null, event?: Function) {
    if (event) {
      const needsToBeBinded = self && !isArrowFunction(event);
      return needsToBeBinded ? event.bind(self) : event;
    }
    return event;
  }
  static setAttributeOrProperty(element: Element | HTMLElement, name: string, isUpdate: boolean, value: any) {
    if (name.startsWith('_')) {
      const propertyName = name.substr(1);
      this.setProperty(element, isUpdate, propertyName, value);
    } else {
      this.setAttribute(element, isUpdate, name, value);
    }
  }
  static setAttribute(element: Element | HTMLElement, isUpdate: boolean, name: string, newValue: any) {
    if (isUpdate) {
      if (!deepEqual(newValue, this.getAttribute(element, name))) {
        this.setAttributeValue(element, name, newValue);
      }
    } else {
      this.setAttributeValue(element, name, newValue);
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
  static setStyle(self: LSCustomElement | null, element: Element | HTMLElement, cssObject: CSSProperties, id: string) {
    if (supportsAdoptingStyleSheets && self) {
      AdoptedStyle({ id: self.id }, [createStyleSheet(cssObject, [`#${id}`])], self);
    } else {
      element.removeAttribute('style');
      if (cssObject && elementIsHTMLElement(element)) {
        Object.entries(cssObject).forEach(([key, value]) => {
          // Manual Update is faster than Object.assign	
          (element as HTMLElement).style[key] = value;
        });
      } else {
        this.setAttributeValue(element, 'style', cssObject);
      }
    }
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
      // TODO: Complex objects?
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

