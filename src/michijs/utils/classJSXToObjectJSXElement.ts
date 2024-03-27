import type { ClassJSXElement, ObjectJSXElement } from "../types";

export const classJSXToObjectJSXElement = ({
  jsxTag,
  attrs,
}: ClassJSXElement): ObjectJSXElement => {
  if (jsxTag.extends)
    return {
      jsxTag: jsxTag.extends,
      attrs: {
        ...attrs,
        is: jsxTag.tag,
      },
    };
  return {
    jsxTag: jsxTag.tag,
    attrs,
  };
};
