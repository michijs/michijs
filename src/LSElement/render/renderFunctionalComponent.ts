import { createElement } from './createElement';
import { ElementMapChild } from '../types';

export function renderFunctionalComponent(elementMap: ElementMapChild) {
  return createElement(null, elementMap);
}