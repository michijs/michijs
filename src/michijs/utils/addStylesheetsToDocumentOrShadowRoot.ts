export const addStylesheetsToDocumentOrShadowRoot = (
  target: DocumentOrShadowRoot,
  ...newStylesheets: CSSStyleSheet[]
): void => {
  // Jest throws adoptedStyleSheets undefined....
  if (target?.adoptedStyleSheets)
    target.adoptedStyleSheets = [
      ...new Set([...target.adoptedStyleSheets, ...newStylesheets]),
    ];
};
