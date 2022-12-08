export const addStylesheetsToDocumentOrShadowRoot= (target: DocumentOrShadowRoot, ...newStylesheets: CSSStyleSheet[]) => {
  // Jest throws adoptedStyleSheets undefined....
  if (target && target.adoptedStyleSheets)
    target.adoptedStyleSheets = [...new Set([...target.adoptedStyleSheets, ...newStylesheets])];
};