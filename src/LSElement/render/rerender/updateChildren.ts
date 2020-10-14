import { ElementMap, ElementMapChild, LSCustomElement } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { updateElement } from './index';

export function updateChildren(rootElement: DocumentFragment, movedElements: DocumentFragment, parent: LSCustomElement, newChildrenMap: ElementMapChild[]) {
  const isACustomElement = isCustomElement(parent);
  const hasShadowRoot = parent.shadowRoot;

  if (!parent.ls.attrsManagedByH.staticChildren && (!isACustomElement || hasShadowRoot)) {
    updateElement(rootElement,movedElements, parent, newChildrenMap as ElementMap[]);
  }
}
