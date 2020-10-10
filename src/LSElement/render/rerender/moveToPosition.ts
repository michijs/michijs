import { ElementMap } from '../../types';
import { movedElements } from './index';

export function moveToPosition(rootElement: DocumentFragment, parent: HTMLElement, childMapToMove: ElementMap, childInThatPosition: HTMLElement) {
  const childToMove: HTMLElement = rootElement.getElementById(childMapToMove.attrs.id);
  movedElements.push(childInThatPosition);
  parent.replaceChild(childToMove, childInThatPosition);
  return childToMove;
}
