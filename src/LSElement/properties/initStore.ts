import { LSCustomElement } from '../types';
import { useStore } from '../hooks/useStore';
import { rerender } from '../render/rerender';

function getObservedProperties(self: LSCustomElement){
  return self.lsStatic.attributes.concat(self.lsStatic.reflectedAttributes).concat(self.lsStatic.stores.map(store => store.propertyKey));
}

export function initStore(self: LSCustomElement) {
  const initialState = new Map();

  getObservedProperties(self).forEach(propertyKey => {
    initialState.set(propertyKey, self[propertyKey]);
  });

  self.ls.stateStore = useStore(initialState);

  self.ls.stateStore.onFinishChanges(() => {
    if (self.ls.alreadyRendered) {
      rerender(self);
    }
  });
}