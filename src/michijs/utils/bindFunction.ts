import { isArrowFunction } from './isArrowFunction';

export function bindFunction<T extends Function>(self: Element | null, event?: T): T {
  if (event) {
    const needsToBeBinded = self && !isArrowFunction(event);
    return needsToBeBinded ? event.bind(self) : event;
  }
  return event;
}
