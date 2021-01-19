import { createElement } from './createElement';
import { RenderResult } from '../types';

export function renderFunctionalComponent(elementMap: RenderResult) {
  return createElement(null, elementMap);
}