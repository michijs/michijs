import { AdoptedStyleChild } from '../../../types';
import { convertStyleSheetToCSSText } from './convertStyleSheetToCSSText';

export function convertChildToCSSText(child: AdoptedStyleChild){
  return typeof child === 'string' ? child: convertStyleSheetToCSSText(child);
}