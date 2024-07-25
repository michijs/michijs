import { Fragment } from "../components/Fragment";

function jsx(
  jsxTag: any,
  attrs: Record<string, unknown> = {},
): {
  jsxTag: any;
  attrs: Record<string, unknown>;
} {
  return {
    jsxTag,
    attrs,
  };
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
