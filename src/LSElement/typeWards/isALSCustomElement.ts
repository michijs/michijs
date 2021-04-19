import { LSCustomElement } from '../types';

export function isALSCustomElement(param: LSCustomElement | DocumentFragment | null): param is LSCustomElement {
  return param['id'];
}