import { ElementMap, LSCustomElement } from '../../types';

export function tagsAreDifferent(newChildMap: ElementMap, element: LSCustomElement) {
  return newChildMap.tag.toLowerCase() !== element.tagName.toLowerCase();
}
