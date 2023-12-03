import { Fragment } from "../components";

function jsx(jsxTag, attrs: Record<string, unknown> = {}) {
  return {
    jsxTag,
    attrs
  };
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
