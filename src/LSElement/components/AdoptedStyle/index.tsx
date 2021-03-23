import { AdoptedStyleChild, LSCustomElement } from '../../types';
import { h } from '../../h';
import { supportsAdoptingStyleSheets } from './supportsAdoptingStyleSheets';
import { addStyleSheetToContainer } from './addStyleSheetToContainer';
import { convertChildToCSSText } from './convertersToCSSText/convertChildToCSSText';
import { updateStyleSheet } from './updateStyleSheet';
import { createStyleSheet } from './createStyleSheet';
import { getShadowRoot } from '../../utils/getShadowRoot';
import { HTMLElements } from 'src/LSElement/h/tags/HTMLElements';

export function AdoptedStyle({ parentRef, ...attrs }: { parentRef: LSCustomElement | Document } & HTMLElements['style'], children: (AdoptedStyleChild) | (AdoptedStyleChild)[]) {
  const childrenAsSingleArray: Array<AdoptedStyleChild> = Array.isArray(children[0]) ? children[0] : [children[0]];

  // @ts-ignore
  const container: StyleSheetContainer = parentRef === document ? document : getShadowRoot(parentRef);
  if (supportsAdoptingStyleSheets && container) {
    const castedParentRef = parentRef as LSCustomElement;
    childrenAsSingleArray.forEach((child, index) => {
      castedParentRef.ls = castedParentRef.ls || {};
      castedParentRef.ls.adoptedStyleSheets = castedParentRef.ls.adoptedStyleSheets || [];
      let adoptedStyleSheetsList = castedParentRef.ls.adoptedStyleSheets.find(x => x.id === attrs.id);
      if (!adoptedStyleSheetsList) {
        adoptedStyleSheetsList = { id: attrs.id, adoptedStyleSheets: [] };
        castedParentRef.ls.adoptedStyleSheets.push(adoptedStyleSheetsList);
      }
      const currentStyleSheet = adoptedStyleSheetsList.adoptedStyleSheets[index];
      if (currentStyleSheet) {
        updateStyleSheet(currentStyleSheet, child);
      } else {
        const sheet = createStyleSheet(child);
        addStyleSheetToContainer(container, adoptedStyleSheetsList, sheet);
      }
    });
  } else {
    return <style {...attrs}>{convertChildToCSSText(childrenAsSingleArray.join(''))}</style>;
  }
}
