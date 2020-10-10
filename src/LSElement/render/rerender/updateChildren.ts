import { ElementMap } from '../../types';
import { isCustomElement } from '../../utils/isCustomElement';
import { updateElement } from './index';

export function updateChildren(rootElement: DocumentFragment, parent: HTMLElement, newChildrenMap: ElementMap[] | string[]) {
  const isACustomElement = isCustomElement(parent);
  const hasShadowRoot = parent.shadowRoot;

  if (!isACustomElement || (isACustomElement && hasShadowRoot)) {
    updateElement(rootElement, parent, newChildrenMap as ElementMap[]);
  }
}
