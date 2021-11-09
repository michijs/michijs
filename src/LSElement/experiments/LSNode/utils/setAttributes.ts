import { CommonJSXAttrs, LSCustomElement } from '../../../..';
import { isAFunction } from '../../../typeWards/IsAFunction';
import { deepEqual } from '../../../utils/deepEqual';
import { bindFunction } from './bindFunction';
import { setAttributeOrProperty } from './setAttributeOrProperty';
import { setStyle } from './setStyle';

export type SetAttributesProps = {
    target: Element;
    newAttributes: CommonJSXAttrs['attrs'];
    oldAttributes?: CommonJSXAttrs['attrs'];
    events: Record<string, EventListenerOrEventListenerObject>,
    self?: LSCustomElement
}

export const setAttributes = ({ target, newAttributes, oldAttributes, events, self }: SetAttributesProps) => {
  if (newAttributes || oldAttributes) {
    const addEventListener = (eventName: string, value: Function) => {
      const bindedFunction = bindFunction(self, value);
      events[eventName] = bindedFunction;
      target.addEventListener(eventName, bindedFunction);
    };
    const removeEventListener = (eventName: string) => {
      target.removeEventListener(eventName, events[eventName]);
      delete events[eventName];
    };
    if (oldAttributes) {
      Object.entries({ ...oldAttributes, ...(newAttributes ?? {}) }).forEach(([name, newValue]) => {
        if (newAttributes && name in newAttributes) {
          if (!deepEqual(newValue, oldAttributes[name])) {
            if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
              const eventName = name.slice(2);
              removeEventListener(eventName);
              addEventListener(eventName, newValue);
            } else if (name === 'style') {
              setStyle(target, newValue);
            } else if (name === 'children') { } else {
              setAttributeOrProperty(target, name, newValue);
            }
          }
        } else if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
          removeEventListener(name.slice(2));
        } else if (name === 'style') {
          target.removeAttribute('style');
        } else if (name === 'children') { } else {
          setAttributeOrProperty(target, name, undefined);
        }
      });
    } else {
      Object.entries(newAttributes).forEach(([name, newValue]) => {
        if (isAFunction(newValue) && name.startsWith('on')) {// Events don't change with jsx
          addEventListener(name.slice(2), newValue);
        } else if (name === 'style') {
          setStyle(target, newValue);
        } else if (name === 'children') { } else {
          setAttributeOrProperty(target, name, newValue);
        }
      });
    }
  }
};