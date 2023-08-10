import { setAttributes } from "../DOM/attributes/setAttributes";
import { Namespaces, RootTags } from "../constants/namespaces";
import { CreateOptions, ObjectJSXElement } from "../types";
import { create } from "./create";

export const createObject = (jsx: ObjectJSXElement, options: CreateOptions) => {
  let isSVG = options.isSVG || jsx.tag === RootTags.SVG;
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
      el = document.createElementNS(Namespaces.SVG, jsx.tag, {
        is: jsx.attrs.is,
      });
    else el = document.createElementNS(Namespaces.SVG, jsx.tag);
  } else {
    isMATHML = options.isMATHML || jsx.tag === RootTags.MATHML;
    if (isMATHML) {
      if (jsx.attrs?.is)
        el = document.createElementNS(Namespaces.MATHML, jsx.tag, {
          is: jsx.attrs.is,
        });
      else el = document.createElementNS(Namespaces.MATHML, jsx.tag);
    } else if (jsx.attrs?.is)
      el = document.createElement(jsx.tag, {
        is: jsx.attrs.is,
      });
    else el = document.createElement(jsx.tag);
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

  setAttributes(el, attrs, options);

  return el;
};
