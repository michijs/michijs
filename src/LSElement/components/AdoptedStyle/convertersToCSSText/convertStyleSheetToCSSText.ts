export function convertStyleSheetToCSSText(styleSheet: CSSStyleSheet) {
  let css = '';
  Array.from(styleSheet.rules).forEach(rule => css += `${rule.cssText} `);
  return css;
}