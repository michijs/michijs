import { ElementMap, ElementMapChild } from '../types';

export function isAnElementMap(childMap: ElementMapChild): childMap is ElementMap {
  return typeof childMap === 'object' && childMap && childMap.tag !== undefined && childMap.attrs !== undefined && childMap.children !== undefined;
}
