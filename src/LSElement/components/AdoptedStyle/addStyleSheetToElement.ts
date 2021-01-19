import { getShadowRoot } from '../../utils/getShadowRoot';
import { LSCustomElement } from '../../types';

export function addStyleSheetToElement(parentRef: LSCustomElement, id: string, sheet: CSSStyleSheet) {
  getShadowRoot(parentRef).adoptedStyleSheets = getShadowRoot(parentRef).adoptedStyleSheets.concat(sheet);
  parentRef.ls.adoptedStyleSheets.push({ id, value: sheet });
}