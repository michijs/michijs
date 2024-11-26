import { getCSSStyleSheetText } from "./getAdoptedStyleSheetText";

export const addStylesheetsToDocumentOrShadowRoot = (
  target: DocumentOrShadowRoot,
  ...newStylesheets: CSSStyleSheet[]
): void => {
  // Safari throws undefined because its not connected when fired
  if (target.adoptedStyleSheets) {
    target.adoptedStyleSheets = [
      ...new Set([...target.adoptedStyleSheets, ...newStylesheets]),
    ];
    return;
  }
  if (target instanceof HTMLElement)
    for (const x of newStylesheets) {
      const originalReplaceSync = x.replaceSync.bind(x);
      const style = document.createElement("style");
      const updateStyle = () => {
        style.textContent = getCSSStyleSheetText(x);
      };
      x.replaceSync = (text) => {
        originalReplaceSync(text);
        updateStyle();
      };
      updateStyle();
      target.append(style);
    }
};
