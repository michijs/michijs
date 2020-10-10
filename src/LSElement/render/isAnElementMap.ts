import { ElementMap } from '../types';

export function isAnElementMap(childMap: ElementMap | string): childMap is ElementMap {
  return typeof childMap === 'object' && childMap && childMap.tag !== undefined && childMap.attrs !== undefined && childMap.children !== undefined;
}
