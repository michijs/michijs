export function newH(tag, { children, ...attrs }) {
	return { tag, attrs, children: Array.isArray(children) ? children : [children] };
}

const Fragment = undefined;

export {
	newH as jsx,
	newH as jsxs,
	newH as jsxDEV,
	Fragment
}