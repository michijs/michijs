import type { LSCustomElement, ElementMap } from '../types';
import { validateElement } from './validateElement';

export function render(self: LSCustomElement) {
  const renderResult = self.render();
  if (renderResult) {
    const renderResultAsArray = !Array.isArray(renderResult) ? [renderResult] : renderResult;
    return processArray(renderResultAsArray, self);
  } return undefined;
}

function processArray(arrayResult: Array<ElementMap>, self: LSCustomElement) {
  const result = new Array<ElementMap>();
  for (let i = 0; i < arrayResult.length; i++) {
    const x = arrayResult[i];
    if (x) {
      if (Array.isArray(x)) {
        result.push(...processArray(x, self));
      } else {
        if (!validateElement(x, result)) {
          continue;
        }
        result.push(x);
      }
    }
  }
  return result;
}