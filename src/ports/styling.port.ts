export interface StylingPort {
  createConstructableStyleSheet(rules: string): CSSStyleSheet;
  adoptStyleSheets(
    element: HTMLElement | ShadowRoot,
    styleSheets: CSSStyleSheet[],
  ): void;
  cssTextToStyleSheet(cssText: string): CSSStyleSheet;
  styleSheetToCssText(styleSheet: CSSStyleSheet): string;
}

export interface CSSVariablesPort {
  setVariable(element: HTMLElement, name: string, value: string): void;
  getVariable(element: HTMLElement, name: string): string;
  removeVariable(element: HTMLElement, name: string): void;
}
