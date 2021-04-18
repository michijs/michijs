import { getShadowRoot } from '../../utils/getShadowRoot';
import { LSCustomElement } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { ElementUpdater } from './index';

export function updateChildren(self: LSCustomElement | DocumentFragment, elementToUpdate: LSCustomElement, jsxElements: JSX.Element[], rootNode: DocumentFragment) {
  const isACustomElement = isCustomElement(elementToUpdate);
  const hasShadowRoot = getShadowRoot(elementToUpdate);

  if (!elementToUpdate.staticChildren && (!isACustomElement || hasShadowRoot)) {
    new ElementUpdater(self, elementToUpdate, rootNode).updateElement(jsxElements);
  }
}
