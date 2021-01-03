import { LSCustomElement } from '../../types';

export function addStyleSheetToElement(parentRef: LSCustomElement, id: string, sheet: CSSStyleSheet) {
  //@ts-ignore
  parentRef.shadowRoot.adoptedStyleSheets = parentRef.shadowRoot.adoptedStyleSheets.concat(sheet);
  parentRef.ls.adoptedStyleSheets.push({ id, value: sheet });
}