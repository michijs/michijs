import type { LSCustomElement } from '../types';

export function render(self: LSCustomElement) {
	const renderResult = self.render();
	if (renderResult) {
		const arrayResult = !Array.isArray(renderResult) ? [renderResult] : renderResult;
		const result = new Array<Element>();

		for (let i = 0; i < arrayResult.length; i++) {
			const x = arrayResult[i];
			if (x) {
				if (Array.isArray(x)) {
					result.push(...x);
				} else {
					result.push(x);
				}
			}
		}
		if (self.ls.styles) {
			result.push(self.ls.styles);
		}
		return result;
	} else return undefined;
}