import { ElementMap } from '../../types';
import { movedElements } from './index';

export function elementWasMoved(newChildMap: ElementMap) {
  return movedElements.find(x => x.id === newChildMap.attrs.id);
}
