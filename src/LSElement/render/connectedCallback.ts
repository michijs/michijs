import { LSCustomElement } from '../types';
import { executeFirstRender } from './executeFirstRender';

export function connectedCallback(self: LSCustomElement) {
	if (self.componentWillMount) {
		self.componentWillMount();
	}
	executeFirstRender(self);
	self.ls.alreadyRendered = true;
	if (self.componentDidMount) {
		self.componentDidMount();
	}
}