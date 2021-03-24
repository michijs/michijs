import { getShadowRoot } from '../../utils/getShadowRoot';
import { ElementMap, ElementMapChild, LSCustomElement } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { updateElement } from './index';

export function updateChildren(self: LSCustomElement, rootElement: DocumentFragment, movedElements: DocumentFragment, parent: LSCustomElement, newChildrenMap: ElementMapChild[]) {
  const isACustomElement = isCustomElement(parent);
  const hasShadowRoot = getShadowRoot(parent);

  if (!parent.staticChildren && (!isACustomElement || hasShadowRoot)) {
    updateElement(self, rootElement, movedElements, parent, newChildrenMap as ElementMap[]);
  }
}
