import { getCSSStyleSheetText } from "./getAdoptedStyleSheetText";

export const addStylesheetsToDocumentOrShadowRoot = (
  target: DocumentOrShadowRoot,
  ...newStylesheets: CSSStyleSheet[]
): void => {
  // Safari throws undefined because its not connected when fired
  if (target.adoptedStyleSheets)
    target.adoptedStyleSheets = [
      ...new Set([...target.adoptedStyleSheets, ...newStylesheets]),
    ];
  else if (target instanceof HTMLElement) {
    newStylesheets.forEach((x) => {
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
    });
  }
};
