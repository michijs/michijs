import { LSCustomElement } from '../../types';

export function findStyleSheet(parentRef: LSCustomElement, id: string) {
  return parentRef.ls.adoptedStyleSheets.find(x => x.id === id);
}