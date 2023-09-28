import { Fragment } from "../components";
import { Key } from "../types";

function jsx(jsxTag, attrs: Record<string, unknown> = {}, key?: Key) {
  return {
    jsxTag,
    attrs,
    key,
  };
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
