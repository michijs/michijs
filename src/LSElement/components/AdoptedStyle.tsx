import { CompatibleStyleSheet, AdoptedStyleSheetList, FC, StyleSheetContainer } from '../types';
import { supportsAdoptingStyleSheets } from '../css/supportsAdoptingStyleSheets';
import { getShadowRoot } from '../utils/getShadowRoot';
import { HTMLElements } from '../h/tags/HTMLElements';
import { h } from '../h';
import { SVGElements } from '../h/tags/SVGElements';
import { createStyleSheet } from '../css/createStyleSheet';

type AdoptedStyleProps = HTMLElements['style'] & SVGElements['style'];

function addStyle(container: StyleSheetContainer, child: CompatibleStyleSheet, adoptedStyleSheetList: AdoptedStyleSheetList, index: number) {
  const newStyleSheet = typeof child === 'string' ? createStyleSheet(child) as CSSStyleSheet : child;
  container.adoptedStyleSheets = container.adoptedStyleSheets.concat(newStyleSheet);
  adoptedStyleSheetList.items[index] = newStyleSheet;
}

/**
 * Allows to use Constructable Stylesheets.  
 * If there is no shadow root it will use the style tag
 * @link https://developers.google.com/web/updates/2019/02/constructable-stylesheets
*/
export const AdoptedStyle: FC<AdoptedStyleProps, CompatibleStyleSheet | CompatibleStyleSheet[]> = (attrs, children, targetElement) => {
  const childrenAsArray = Array.isArray(children) ? children : [children];

  // const rootNode = getRootNode(target);
  // The target element is the document or the closest shadow root element
  // const targetElement = (target === document || rootNode === document ? document : (rootNode as ShadowRoot).host) as LSCustomElement & Document;
  // The stylesheet container is 
  // const targetStyleSheetContainer = (targetElement === document ? document: getShadowRoot(targetElement)) as unknown as StyleSheetContainer;

  // if (!targetElement.ls)//For document
  //   // @ts-ignore
  //   targetElement.ls = { adoptedStyleSheets: [] };

  /**Does not work without a shadow root - It can cause problems when routing /
   *  disconnecting an element because the styles could still be in the root of the parent document / shadowRoot */

  const targetStyleSheetContainer = targetElement ? getShadowRoot(targetElement): null;
  
  if (supportsAdoptingStyleSheets && targetStyleSheetContainer) {

    let adoptedStyleSheetList = targetElement.ls.adoptedStyleSheets.find(x => x.id === attrs.id);

    // If the style list does not exist I create it
    if (!adoptedStyleSheetList) {
      adoptedStyleSheetList = { id: attrs.id, items: [] };
      targetElement.ls.adoptedStyleSheets.push(adoptedStyleSheetList);
    }
    childrenAsArray.forEach((child, index) => {
      const oldStyleSheet = adoptedStyleSheetList.items[index];
      if (oldStyleSheet) {
        if (child !== oldStyleSheet) {
          // Removes oldStyleSheet from the adoptedStyleSheets list
          targetStyleSheetContainer.adoptedStyleSheets = targetStyleSheetContainer.adoptedStyleSheets.filter(x => x !== oldStyleSheet);
          if (child) {
            addStyle(targetStyleSheetContainer, child, adoptedStyleSheetList, index);
          } else {
            adoptedStyleSheetList.items.splice(index, 1);
          }
        }
      } else if (child) {
        addStyle(targetStyleSheetContainer, child, adoptedStyleSheetList, index);
      }
    });
  } else {
    return <style {...attrs}>{childrenAsArray.map(x => {
      if (typeof x === 'string') {
        return x;
      }
      return Array.from(x.cssRules).map(rule => rule.cssText).join('');
    }).join('')}</style>;
  }
};