import { AdoptedStyle } from '../components';
import { FragmentTag, ListTag } from '../constants';
import { createStyleSheet } from '../css/createStyleSheet';
import { supportsAdoptingStyleSheets } from '../css/supportsAdoptingStyleSheets';
import { LSCustomElement } from '../types';
import { getShadowRoot } from './getShadowRoot';

const style = createStyleSheet({
  [`${ListTag}, ${FragmentTag}`]: {
    display: 'contents',
    borderRadius: 'inherit'
  }
});


export function addFragmentAndListStyle(el: ElementCSSInlineStyle, self?: Element) {
  if (el && getShadowRoot(self) && supportsAdoptingStyleSheets)
    AdoptedStyle({ id: 'ls-list-style', children: [style] }, self as LSCustomElement);
  else {
    el.style.display = 'contents';
    el.style.borderRadius = 'inherit';
  }
}