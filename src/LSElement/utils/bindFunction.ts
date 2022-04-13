import { isArrowFunction } from './isArrowFunction';

export function bindFunction(self: Element | null, event?: Function) {
  if (event) {
    const needsToBeBinded = self && !isArrowFunction(event);
    return needsToBeBinded ? event.bind(self) : event;
  }
  return event;
}
