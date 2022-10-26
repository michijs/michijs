import { LSCustomElement } from '../types';
import { getShadowRoot } from './getShadowRoot';

export const addStylesheetsToCustomElement = (target: LSCustomElement, readonlyStyleSheet: boolean, ...newStylesheets: CSSStyleSheet[]) => {
  const shadowRoot = getShadowRoot(target as LSCustomElement);
  const rootNode = shadowRoot ?? (target.getRootNode() as unknown as DocumentOrShadowRoot);
  if (shadowRoot)
    shadowRoot.adoptedStyleSheets = [...rootNode.adoptedStyleSheets, ...newStylesheets];
  else {
    target.ls.styles.push(...newStylesheets.map(x => {
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