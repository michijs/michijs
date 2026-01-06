import type { StylingPort, CSSVariablesPort } from "../../ports/styling.port";

export class BrowserStylingAdapter implements StylingPort {
  createConstructableStyleSheet(rules: string): CSSStyleSheet {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(rules);
    return sheet;
  }

  adoptStyleSheets(
    element: HTMLElement | ShadowRoot,
    styleSheets: CSSStyleSheet[],
  ): void {
    if ("adoptedStyleSheets" in element) {
      element.adoptedStyleSheets = styleSheets;
    }
  }

  cssTextToStyleSheet(cssText: string): CSSStyleSheet {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  }

  styleSheetToCssText(styleSheet: CSSStyleSheet): string {
    let cssText = "";
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      cssText += styleSheet.cssRules[i].cssText + "\n";
    }
    return cssText;
  }
}

export class BrowserCSSVariablesAdapter implements CSSVariablesPort {
  setVariable(element: HTMLElement, name: string, value: string): void {
    element.style.setProperty(name, value);
  }

  getVariable(element: HTMLElement, name: string): string {
    return element.style.getPropertyValue(name);
  }

  removeVariable(element: HTMLElement, name: string): void {
    element.style.removeProperty(name);
  }
}

export const stylingAdapter = new BrowserStylingAdapter();
export const cssVariablesAdapter = new BrowserCSSVariablesAdapter();
