import { AdoptedStyleChild, FC, LSCustomElement } from '../../types';
import { supportsAdoptingStyleSheets } from './supportsAdoptingStyleSheets';
import { addStyleSheetToContainer } from './addStyleSheetToContainer';
import { convertChildToCSSText } from './convertersToCSSText/convertChildToCSSText';
import { updateStyleSheet } from './updateStyleSheet';
import { createStyleSheet } from './createStyleSheet';
import { getShadowRoot } from '../../utils/getShadowRoot';
import { HTMLElements } from '../../h/tags/HTMLElements';
import { getRootNode } from '../../DOM/getRootNode';
import { h } from '../../h';

type Ref = LSCustomElement | Document;
type AdoptedStyleProps = HTMLElements['style'] & { ref?: Ref };
type AdoptedStyleChildren = (AdoptedStyleChild | AdoptedStyleChild[])[];

export const AdoptedStyle: FC<AdoptedStyleProps, AdoptedStyleChildren, Ref> = ({ ref, ...attrs }, children, self) => {
  const childrenAsSingleArray: Array<AdoptedStyleChild> = Array.isArray(children[0]) ? children[0] : [children[0]];
  const parentRef: LSCustomElement | Document = ref || self;

  // @ts-ignore
  const container: StyleSheetContainer = parentRef === document ? document : getShadowRoot(parentRef) || getRootNode(parentRef);//Without Shadow Root
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
};