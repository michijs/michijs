import type { LSCustomElement, StylesType } from '../types';
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

export function importStyles(self: LSCustomElement) {
	const styles: StylesType = self.styles ? self.styles() : undefined;
	if (styles && styles.length > 0) {
		const styleElement = document.createElement('style');
		styleElement.setAttribute('scoped', '');
		styleElement.id = 'ls-style';
		Promise.all(styles).then(styleArray => {
			styleElement.textContent = styleArray.map(x => typeof x === 'string' ? x : x.default).join(' ');
		});
		self.ls.styles = styleElement;
	}
}
