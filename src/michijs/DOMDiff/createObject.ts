import { setProperties } from "../DOM/attributes/setProperties";
import { Namespaces, RootTags } from "../constants/namespaces";
import type { ObjectJSXElement } from "../types";
import { create } from "./create";

const getNamespace = (
  jsx: ObjectJSXElement,
  contextNamespace: string = Namespaces.HTML,
): string => {
  if (jsx.jsxTag === RootTags.SVG) return Namespaces.SVG;
  if (jsx.jsxTag === RootTags.MATHML) return Namespaces.MATHML;
  return contextNamespace;
};

export const createObject = (
  jsx: ObjectJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): Element => {
  const newNamespace = getNamespace(jsx, contextNamespace);
  const el = document.createElementNS(newNamespace, jsx.jsxTag, {
    is: jsx.attrs?.is,
  });
  const { children, ...attrs } = jsx.attrs;

  if (children)
    if (Array.isArray(children))
      el.append(
        ...children.map((x) => create(x, contextElement, contextNamespace)),
      );
    else el.append(create(children, contextElement, contextNamespace));

  setProperties(el, attrs, contextElement);

  return el;
};
