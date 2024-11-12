import { setProperties } from "./attributes/setProperties";
import { Namespaces, RootTags } from "../constants/namespaces";
import type { ObjectJSXElement } from "../types";
import { create } from "./create";

const getNamespace = (
  jsxTag: string,
  contextNamespace: string = Namespaces.HTML,
): string => {
  if (jsxTag === RootTags.SVG) return Namespaces.SVG;
  if (jsxTag === RootTags.MATHML) return Namespaces.MATHML;
  return contextNamespace;
};

// This has a lot of performance improvement for some reason
export const createObject = (
  // This has a lot of performance improvement for some reason
  { attrs: { children, ...attrs }, jsxTag }: ObjectJSXElement,
  contextElement?: Element,
  contextNamespace?: string,
): Element => {
  const newNamespace = getNamespace(jsxTag, contextNamespace);

  const el = document.createElementNS(newNamespace, jsxTag, {
    is: attrs?.is,
  });

  if (children)
    if (Array.isArray(children))
      el.append(
        ...children.map((x) => create(x, contextElement, newNamespace)),
      );
    else el.append(create(children, contextElement, newNamespace));

  setProperties(el, attrs, contextElement);

  return el;
};
