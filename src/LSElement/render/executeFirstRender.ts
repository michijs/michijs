import type { LSCustomElement } from '../types';
import { render } from './render';
import { getRootNode } from './gerRootNode';

export function executeFirstRender(self: LSCustomElement) {
	const renderResult = render(self);
	if (renderResult) {
		renderResult.forEach(element => {
			getRootNode(self).appendChild(element);
		});
	}
}