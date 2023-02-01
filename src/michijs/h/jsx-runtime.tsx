import { Fragment } from "../components";

function jsx(tag, { children, ...attrs }, key) {
	return { tag, attrs: { children: Array.isArray(children) ? children[0]?.key !== undefined ? [children] : children : [children], ...attrs }, key };
}

export {
	jsx,
	jsx as jsxs,
	jsx as jsxDEV,
	Fragment
}