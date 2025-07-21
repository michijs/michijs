import { getCSSStyleSheetText } from '../utils/getCSSStyleSheetText';

interface CloneStylesheet {
  (stylesheet?: CSSStyleSheet, $window?: typeof globalThis | null): CSSStyleSheet;
  (stylesheet: undefined, $window?: typeof globalThis | null): undefined;
}

export const cloneStylesheet: CloneStylesheet = (stylesheet, $window = window as typeof globalThis | null) => {
  if (!stylesheet) return stylesheet;
  const newSheet = new $window!.CSSStyleSheet();
  newSheet.replaceSync(getCSSStyleSheetText(stylesheet));
  return newSheet;
}