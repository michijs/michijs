import type { ClassJSXElement, ObjectJSXElement } from "../types";

export const classJSXToObjectJSXElement = (jsx: ClassJSXElement): ObjectJSXElement => {
  if (jsx.jsxTag.extends) {
    jsx.attrs.is = jsx.jsxTag.tag;
    (jsx as unknown as ObjectJSXElement).jsxTag = jsx.jsxTag.extends;
    return (jsx as unknown as ObjectJSXElement);
  }
  (jsx as unknown as ObjectJSXElement).jsxTag = jsx.jsxTag.tag;
  return (jsx as unknown as ObjectJSXElement);
};
