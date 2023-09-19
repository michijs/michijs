import { setProperties } from "../DOM/attributes/setProperties";
import { Namespaces, RootTags } from "../constants/namespaces";
import { CreateOptions, ObjectJSXElement } from "../types";
import { create } from "./create";

export const createObject = (jsx: ObjectJSXElement, options: CreateOptions) => {
  let isSVG = options.isSVG || jsx.jsxTag === RootTags.SVG;
  let isMATHML;
  let el: Element;
  const {
    children,
    $staticChildren,
    $oncreated,
    $doNotTouchChildren,
    $onupdate,
    ...attrs
  } = jsx.attrs;
  if (isSVG) {
    if (jsx.attrs?.is)
      el = document.createElementNS(Namespaces.SVG, jsx.jsxTag, {
        is: jsx.attrs.is,
      });
    else el = document.createElementNS(Namespaces.SVG, jsx.jsxTag);
  } else {
    isMATHML = options.isMATHML || jsx.jsxTag === RootTags.MATHML;
    if (isMATHML) {
      if (jsx.attrs?.is)
        el = document.createElementNS(Namespaces.MATHML, jsx.jsxTag, {
          is: jsx.attrs.is,
        });
      else el = document.createElementNS(Namespaces.MATHML, jsx.jsxTag);
    } else if (jsx.attrs?.is)
      el = document.createElement(jsx.jsxTag, {
        is: jsx.attrs.is,
      });
    else el = document.createElement(jsx.jsxTag);
  }

  // $oncreated?.(el, isSVG, isMATHML, self);

  // if (!el.$doNotTouchChildren && !$doNotTouchChildren)
  el.append(
    ...children.map((x) =>
      create(x, {
        ...options,
        isMATHML,
        isSVG,
      }),
    ),
  );

  setProperties(el, attrs, options);

  return el;
};
