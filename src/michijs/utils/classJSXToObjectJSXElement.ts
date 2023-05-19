import { ClassJSXElement, ObjectJSXElement } from "../types";

export const classJSXToObjectJSXElement = ({
  tag,
  attrs,
  key,
}: ClassJSXElement): ObjectJSXElement => {
  if (tag.extends)
    return {
      tag: tag.extends,
      attrs: {
        ...attrs,
        is: tag.tag,
      },
      key,
    };
  return {
    tag: tag.tag,
    attrs,
    key,
  };
};
