import { LSCustomElement } from '../types';

export function isADocumentFragment(param: LSCustomElement | DocumentFragment | null): param is DocumentFragment {
  return param['id'] !== undefined;
}