import { Fragment } from '../dist';

export function newH(tag, { children, ...attrs }, key) {
	return { tag, attrs: { children: Array.isArray(children) ? children : [children], ...attrs }, key };
}

export {
	newH as jsx,
	newH as jsxs,
	newH as jsxDEV,
	Fragment
}