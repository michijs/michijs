import { LSCustomElement, EventDispatcherOptionsType } from '../../types';
import { CustomEventDispatcher } from '../../classes/CustomEventDispatcher';

export function EventDispatcher(eventInitOptions?: EventDispatcherOptionsType): PropertyDecorator {
  return function (_target: LSCustomElement, propertyKey: string) {
    return {
      get() {
        return new CustomEventDispatcher(
          propertyKey,
          this,
          eventInitOptions?.bubbles,
          eventInitOptions?.cancelable,
          eventInitOptions?.composed
        );
      },
    };
  };
}
