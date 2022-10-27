import { MichiCustomElement } from '../types';
import { getShadowRoot } from './getShadowRoot';

export const addStylesheetsToCustomElement = (target: MichiCustomElement, readonlyStyleSheet: boolean, ...newStylesheets: CSSStyleSheet[]) => {
  const shadowRoot = getShadowRoot(target as MichiCustomElement);
  // Jest throws adoptedStyleSheets undefined....
  if (shadowRoot && shadowRoot.adoptedStyleSheets)
    shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, ...newStylesheets];
  else {
    target.$michi.styles.push(...newStylesheets.map(x => {
      const el = document.createElement('style');
      el.textContent = Array.from(x.cssRules).reduce((previousRule, rule) => (`${previousRule}${rule.cssText}`), '');
      if (!readonlyStyleSheet) {
        const oldReplaceSync = x.replaceSync;
        // Binding stylesheet with style tag
        x.replaceSync = (text: string) => {
          el.textContent = text;
          oldReplaceSync.call(x, text);
        };
      }
      return el;
    }));
  }
};