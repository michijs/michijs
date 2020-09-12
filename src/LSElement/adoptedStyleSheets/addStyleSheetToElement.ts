import { LSCustomElement } from "../types";

export function addStyleSheetToElement(parentRef: LSCustomElement, sheet: CSSStyleSheet) {
    //@ts-ignore
    parentRef.shadowRoot.adoptedStyleSheets = parentRef.shadowRoot.adoptedStyleSheets.concat(sheet);
}