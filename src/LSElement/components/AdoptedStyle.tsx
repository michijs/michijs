import { HTMLAttributesWithMandatoryId } from '../h/JSX/HTMLAttributes';
import { LSCustomElement } from '../types';
import { h } from '../h';

//@ts-ignore
export const supportsAdoptingStyleSheets = window.ShadowRoot && (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;

export function AdoptedStyle({ parentRef, ...attrs }: { parentRef: LSCustomElement } & HTMLAttributesWithMandatoryId, children: any) {
  if (parentRef.shadowRoot && supportsAdoptingStyleSheets) {
    let currentStyleSheet;
    if (parentRef.ls.adoptedStyleSheets) {
      currentStyleSheet = parentRef.ls.adoptedStyleSheets.find(x => x.id === attrs.id);
    } else {
      parentRef.ls.adoptedStyleSheets = [];
    }
    if (currentStyleSheet) {
      //@ts-ignore
      currentStyleSheet.value.replaceSync(children);
    } else {
      const sheet = new CSSStyleSheet();
      //@ts-ignore
      sheet.replaceSync(children);
      parentRef.ls.adoptedStyleSheets.push({ id: attrs.id, value: sheet });
      //@ts-ignore
      parentRef.shadowRoot.adoptedStyleSheets = parentRef.shadowRoot.adoptedStyleSheets.concat(sheet);
    }
  } else {
    return <style {...attrs}>{children}</style>;
  }
}