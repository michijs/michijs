import { HTMLAttributesWithMandatoryId } from '../h/JSX/HTMLAttributes';
import { LSCustomElement } from '../types';
import { h } from '../h';
import { supportsAdoptingStyleSheets } from './supportsAdoptingStyleSheets';
import { createStyleSheet } from './createStyleSheet';
import { addStyleSheetToElement } from './addStyleSheetToElement';

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
      const sheet = createStyleSheet(children);
      addStyleSheetToElement(parentRef,sheet);
      parentRef.ls.adoptedStyleSheets.push({ id: attrs.id, value: sheet });
    }
  } else {
    return <style {...attrs}>{children}</style>;
  }
}