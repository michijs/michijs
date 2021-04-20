import type { AdoptedStyleChild } from '../../../types';
import { createStyleSheetFromText } from './createStyleSheetFromText';

export function createStyleSheet(child: AdoptedStyleChild) {
  return typeof child === 'string' ? createStyleSheetFromText(child) : child;
}


