import { Fragment } from "../components";
import { Key } from "../types";

function jsx(tag, { children, ...attrs }: Record<string,unknown>, key?: Key) {
	return { tag, attrs: { children: Array.isArray(children) ? children[0]?.key !== undefined ? [children] : children : [children], ...attrs }, key };
}

export {
	jsx,
	jsx as jsxs,
	jsx as jsxDEV,
	Fragment
}