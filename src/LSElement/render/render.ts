import type { LSCustomElement, ElementMap } from '../types';
import { validateElement } from './validateElement';

export function render(self: LSCustomElement) {
  const renderResult = self.render?.();
  if (renderResult) {
    const renderResultAsArray = !Array.isArray(renderResult) ? [renderResult] : renderResult;
    return processRenderResult(renderResultAsArray);
  } return undefined;
}

function processRenderResult(arrayResult: Array<ElementMap>) {
  const result = new Array<ElementMap>();
  for (let i = 0; i < arrayResult.length; i++) {
    const x = arrayResult[i];
    if (x) {
      if (Array.isArray(x)) {
        result.push(...processRenderResult(x));
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