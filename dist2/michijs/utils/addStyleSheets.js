/**
 * @param {Element} el
 * @param {...CSSStyleSheet} [newStylesheets]
 */
export const addStylesheets = (el, ...newStylesheets) => {
  const target = el.shadowRoot ?? el.getRootNode();

  // Jest throws adoptedStyleSheets undefined....
  if (target?.adoptedStyleSheets)
    target.adoptedStyleSheets = [
      ...new Set([...target.adoptedStyleSheets, ...newStylesheets]),
    ];
};
