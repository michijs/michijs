import type { AdoptedStyleSheetList, StyleSheetContainer } from '../../types';

export function addStyleSheetToContainer(container: StyleSheetContainer, styleSheetList: AdoptedStyleSheetList, sheet: CSSStyleSheet) {
  container.adoptedStyleSheets = container.adoptedStyleSheets.concat(sheet);
  styleSheetList.adoptedStyleSheets.push(sheet);
}