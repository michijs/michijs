/**
 * @param {DocumentOrShadowRoot} target
 * @param {...CSSStyleSheet} [newStylesheets]
 */
export const addStylesheetsToDocumentOrShadowRoot = (
  target,
  ...newStylesheets
) => {
  // Jest throws adoptedStyleSheets undefined....
  if (target?.adoptedStyleSheets)
    target.adoptedStyleSheets = [
      ...new Set([...target.adoptedStyleSheets, ...newStylesheets]),
    ];
};
