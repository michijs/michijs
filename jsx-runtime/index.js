export function newH(tag, { children, ...attrs }, key) {
	return { tag, attrs: { children: Array.isArray(children) ? children : [children], ...attrs }, key };
}

const Fragment = (attrs) => ({ tag: 'fragment', attrs });

export {
	newH as jsx,
	newH as jsxs,
	newH as jsxDEV,
	Fragment
}