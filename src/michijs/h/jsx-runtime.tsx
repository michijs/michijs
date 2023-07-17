import { Fragment } from "../components";
import { Key } from "../types";

function jsx(tag, attrs: Record<string, unknown>, key?: Key) {
  return {
    tag,
    attrs,
    key,
  };
}

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };
