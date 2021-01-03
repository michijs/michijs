import { LSCustomElement } from 'src/LSElement/types';
import { addStores } from '../../properties/addStores';
import { initStore } from '../../properties/initStore';
import { addAttributes } from '../../properties/addAttributes';
import { addStoredAttributes } from '../../properties/addStoredAttributes';
import { addObservers } from '../../properties/addObservers';

export function elementConstructor(self: LSCustomElement) {
  self.ls = self.ls || {};
  initStore(self);
  addStores(self);
  addAttributes(self);
  addStoredAttributes(self);
  addObservers(self);
}