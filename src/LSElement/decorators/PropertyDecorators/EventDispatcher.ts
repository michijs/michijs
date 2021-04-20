import type { LSCustomElement, EventDispatcherOptionsType } from '../../types';

export function EventDispatcher(eventInitOptions: EventDispatcherOptionsType = {}): PropertyDecorator {
  return function (_target: LSCustomElement, propertyKey: string) {
    const { bubbles = true, cancelable = false, composed = undefined } = eventInitOptions;
    return {
      get() {
        const element = this;
        return {
          dispatch<T>(detail: T) {
            const event = new CustomEvent(propertyKey.toLowerCase(), { bubbles, cancelable, composed, detail });
            return element.dispatchEvent(event);
          }
        };
      },
    };
  };
}
