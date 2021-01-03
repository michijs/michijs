import { HTMLAttributesWithMandatoryId } from '../../h/JSX/HTMLAttributes';
import { AdoptedStyleChild, AdoptedStyleSheet, LSCustomElement } from '../../types';
import { h } from '../../h';
import { supportsAdoptingStyleSheets } from './supportsAdoptingStyleSheets';
import { addStyleSheetToElement } from './addStyleSheetToElement';
import { convertChildToCSSText } from './convertersToCSSText/convertChildToCSSText';
import { updateStyleSheet } from './updateStyleSheet';
import { createStyleSheet } from './createStyleSheet';
import { findStyleSheet } from './findStyleSheet';

export function AdoptedStyle({ parentRef, ...attrs }: { parentRef: LSCustomElement } & Omit<HTMLAttributesWithMandatoryId,'media'>, children: (AdoptedStyleChild) | (AdoptedStyleChild)[]) {
  const child = children[0] || children;
  if (parentRef.shadowRoot && supportsAdoptingStyleSheets) {
    parentRef.ls.adoptedStyleSheets = parentRef.ls.adoptedStyleSheets || [];
    const currentStyleSheet: AdoptedStyleSheet = findStyleSheet(parentRef, attrs.id);
    if (currentStyleSheet) {
      updateStyleSheet(currentStyleSheet.value, child);
    } else {
      const sheet = createStyleSheet(child);
      addStyleSheetToElement(parentRef, attrs.id, sheet);
    }
  } else {
    return <style {...attrs}>{convertChildToCSSText(child)}</style>;
  }
}
