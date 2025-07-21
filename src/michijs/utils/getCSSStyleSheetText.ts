export const getCSSStyleSheetText = (css: CSSStyleSheet) =>
  Array.from(css.cssRules)
    .map((x) => x.cssText)
    .join("");
