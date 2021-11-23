import { Attributes } from '@lsegurado/htmltype';
import { LSCustomElement, AnyObject, LSNodeEvents } from '../../types';
import { isAFunction } from '../../typeWards/IsAFunction';
import { deepEqual } from '../../utils/deepEqual';
import { bindFunction } from '../../utils/bindFunction';
import { setAttributeOrProperty } from './setAttributeOrProperty';
import { setStyle } from './setStyle';

type SetAttributesProps = {
  target: Element;
  newAttributes: AnyObject;
  oldAttributes?: AnyObject;
  events: LSNodeEvents,
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
          const oldValue = oldAttributes[name];
          if (!deepEqual(newValue, oldValue)) {
            if (name.startsWith('on') && isAFunction(oldValue))
              removeEventListener(name.slice(2));
            if (name.startsWith('on') && isAFunction(newValue))
              addEventListener(name.slice(2), newValue);
            else if (name === 'style')
              setStyle(target, newValue as Attributes.CSSProperties);
            else if (name !== 'children')
              setAttributeOrProperty(target, name, newValue);
          }
        } else if (isAFunction(newValue) && name.startsWith('on'))
          removeEventListener(name.slice(2));
        else if (name === 'style')
          target.removeAttribute('style');
        else if (name !== 'children')
          setAttributeOrProperty(target, name, undefined);
      });
    } else {
      Object.entries(newAttributes).forEach(([name, newValue]) => {
        if (isAFunction(newValue) && name.startsWith('on'))// Events don't change with jsx
          addEventListener(name.slice(2), newValue);
        else if (name === 'style')
          setStyle(target, newValue as Attributes.CSSProperties);
        else if (name !== 'children')
          setAttributeOrProperty(target, name, newValue);
      });
    }
  }
};