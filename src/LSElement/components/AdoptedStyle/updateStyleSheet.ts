import { AdoptedStyleChild } from '../../types';
import { convertStyleSheetToCSSText } from './convertersToCSSText/convertStyleSheetToCSSText';

export function updateStyleSheet(styleSheet: CSSStyleSheet, child: AdoptedStyleChild) {
  if (child !== styleSheet) {
    const css = typeof child === 'string' ? child : convertStyleSheetToCSSText(child);

    // @ts-ignore
    styleSheet.replaceSync(css.toString());
  }
}

