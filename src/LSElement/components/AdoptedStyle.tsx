import { CompatibleStyleSheet, AdoptedStyleSheetList, FC, LSCustomElement, StyleSheetContainer } from '../types';
import { supportsAdoptingStyleSheets } from '../css/supportsAdoptingStyleSheets';
import { getShadowRoot } from '../utils/getShadowRoot';
import { HTMLElements } from '../h/tags/HTMLElements';
import { getRootNode } from '../DOM/getRootNode';
import { h } from '../h';
import { SVGElements } from 'src/LSElement/h/tags/SVGElements';
import { createStyleSheet } from 'src/LSElement/css/createStyleSheet';

type Ref = LSCustomElement | Document;
type AdoptedStyleProps = (HTMLElements['style'] & SVGElements['style']) & { ref?: Ref };

function addStyle(container: StyleSheetContainer, child: CompatibleStyleSheet, adoptedStyleSheetList: AdoptedStyleSheetList, index: number) {
  const newStyleSheet = typeof child === 'string' ? createStyleSheet(child) as CSSStyleSheet : child;
  container.adoptedStyleSheets = container.adoptedStyleSheets.concat(newStyleSheet);
  adoptedStyleSheetList.items[index] = newStyleSheet;
}

export const AdoptedStyle: FC<AdoptedStyleProps, CompatibleStyleSheet | CompatibleStyleSheet[], Ref> = ({ ref, ...attrs }, children, self) => {
  const childrenAsArray = Array.isArray(children) ? children : [children];
  const parentRef: LSCustomElement | Document = ref || self;
  const castedParentRef = parentRef as LSCustomElement;

  const container = (parentRef === document ? document : getShadowRoot(castedParentRef) || getRootNode(castedParentRef)) as unknown as StyleSheetContainer;//Without Shadow Root
  if (supportsAdoptingStyleSheets && container) {
    childrenAsArray.forEach((child, index) => {
      let adoptedStyleSheetList = castedParentRef.ls.adoptedStyleSheets.find(x => x.id === attrs.id);

      if (!adoptedStyleSheetList) {
        adoptedStyleSheetList = { id: attrs.id, items: [] };
        castedParentRef.ls.adoptedStyleSheets[index] = adoptedStyleSheetList;
      }
      const currentStyleSheet = adoptedStyleSheetList.items[index];
      if (currentStyleSheet) {
        if (child !== currentStyleSheet) {
          container.adoptedStyleSheets = container.adoptedStyleSheets.filter(x => x !== currentStyleSheet);
          if (child) {
            addStyle(container, child, adoptedStyleSheetList, index);
          } else {
            adoptedStyleSheetList.items.splice(index, 1);
          }
        }
      } else if (child) {
        addStyle(container, child, adoptedStyleSheetList, index);
      }
    });
  } else {
    return <style {...attrs}>{childrenAsArray.map(x => {
      if (typeof x === 'string') {
        return x;
      } 
      return Array.from(x.rules).map(rule => rule.cssText).join('');
      
    }).join('')}</style>;
  }
};