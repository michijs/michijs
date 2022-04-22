import { CSSObject, CSSProperty } from '../types';

export function valueIsCSSObject(value: CSSProperty): value is CSSObject {
  return typeof value === 'object';
}
