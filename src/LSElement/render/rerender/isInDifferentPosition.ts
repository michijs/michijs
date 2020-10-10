import { ElementMap } from '../../types';

export function isInDifferentPosition(newChildMap: ElementMap, oldChild: HTMLElement) {
  return newChildMap.attrs.id !== oldChild.id;
}
