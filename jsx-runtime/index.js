export function newH(tag, { children, ...attrs }, key) {
	return { tag, attrs: { children: Array.isArray(children) ? children : [children], ...attrs }, key };
}

const Fragment = undefined;

export {
	newH as jsx,
	newH as jsxs,
	newH as jsxDEV,
	Fragment
}