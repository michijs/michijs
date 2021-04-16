import { getShadowRoot } from '../../utils/getShadowRoot';
import { LSCustomElement } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { updateElement } from './index';

export function updateChildren(self: LSCustomElement | DocumentFragment, parent: LSCustomElement, jsxElements: JSX.Element[], rootElement: DocumentFragment) {
  const isACustomElement = isCustomElement(parent);
  const hasShadowRoot = getShadowRoot(parent);

  if (!parent.staticChildren && (!isACustomElement || hasShadowRoot)) {
    updateElement(self, parent, jsxElements, rootElement);
  }
}
