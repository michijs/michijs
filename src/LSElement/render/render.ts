import type { LSCustomElement } from '../types';
import { isCustomElementWithoutShadowRoot } from '../utils/isCustomElementWithoutShadowRoot';

export function render(self: LSCustomElement) {
  const renderResult = self.render();
  if (renderResult) {
    const renderResultAsArray = !Array.isArray(renderResult) ? [renderResult] : renderResult;
    return processArray(renderResultAsArray, self);
  } else return undefined;
}

function processArray(arrayResult: Array<any>, self: LSCustomElement) {
  const result = new Array<Element>();
  const isACustomBuiltInElement = isCustomElementWithoutShadowRoot(self);
  for (let i = 0; i < arrayResult.length; i++) {
    const x = arrayResult[i];
    if (x) {
      if (Array.isArray(x)) {
        result.push(...processArray(x, self));
      } else {
        if (!x.tagName) {
          console.error(`"${x}" is not valid. Please enclose it inside an element.`);
          continue;
        }
        if (!x.id) {
          console.error(`Element "${x.outerHTML}" is not valid. Please add an id to this element.`);
          continue;
        }
        const itemWithSameId = result.find(resultItem => resultItem.id === x.id);
        if (itemWithSameId) {
          console.error(`Element "${x.outerHTML}" has a repeated id with "${itemWithSameId.outerHTML}". Please change the id of this element.`);
          continue;
        }
        if (x.tagName === 'SLOT' && self.ls?.slot && isACustomBuiltInElement) {
          const slotName = x.getAttribute('name') || 'default';
          const children = self.ls?.slot[slotName] || [];
          children.forEach(child => {
            x.appendChild(child);
          });
        }
        result.push(x);
      }
    }
  }
  return result;
}