import type { LSCustomElement } from '../types';
import { updateChangesInDom } from '../render/updateChangesInDom';

export function addReduxStores(self: LSCustomElement) {
	self.lsStatic.stores.forEach(storeProperty => {
		self[storeProperty.propertyName] = storeProperty.store.getState();
		storeProperty.store.subscribe(() => {
			if (self.ls.alreadyConnected) {
				updateChangesInDom(self);
				self[storeProperty.propertyName] = storeProperty.store.getState();
			}
		});
	});
}