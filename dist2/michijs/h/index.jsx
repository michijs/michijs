import { Fragment } from "../components";

/**
 * @param {*} jsxTag
 * @param {Record<string, ?>} [attrs={}]
 * @returns {{ jsxTag: any; attrs: Record<string, unknown>; }}
 */
function jsx(jsxTag, attrs = {}) {
    return {
        jsxTag,
        attrs,
    };
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
