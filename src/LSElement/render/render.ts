import type { LSCustomElement } from '../types';
import { isCustomBuiltInElement } from '../utils/isCustomBuilInElement';

export function render(self: LSCustomElement) {
	const renderResult = self.render();
	if (renderResult) {
		const arrayResult = !Array.isArray(renderResult) ? [renderResult] : renderResult;
		const result = new Array<Element>();
		const isACustomBuiltInElement = isCustomBuiltInElement(self);
		for (let i = 0; i < arrayResult.length; i++) {
			const x = arrayResult[i];
			if (x) {
				if (Array.isArray(x)) {
					result.push(...x);
				} else {
					if (!x.tagName) {
						console.error(`Element "${x}" is not valid. Please enclose it inside an element.`);
						continue;
					}
					if (!x.id) {
						console.error(`Element "${x.outerHTML}" is not valid. Please add an id to this element.`);
						continue;
					}
					const itemWithSameId = result.find(resultItem => resultItem.id === x.id);
					if (itemWithSameId) {
						console.error(`Element "${x.outerHTML}" has a repeated id with "${itemWithSameId.outerHTML}". Please change the id of this element.`);
						continue;
					}
					if (x.tagName === 'SLOT' && self.ls?.slot && isACustomBuiltInElement) {
						const slotName = x.getAttribute('name') || 'default';
						const children = self.ls?.slot[slotName] || [];
						children.forEach(child => {
							x.appendChild(child);
						});
					}
					result.push(x);
				}
			}
		}
		return result;
	} else return undefined;
}